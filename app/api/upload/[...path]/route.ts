import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { ALLOWED_TYPES, MAX_FILE_SIZE, UPLOAD_DIR } from "@/shared/config";

/**
 * RU: Загружает файл в директорию uploads по переданному пути.
 * EN: Uploads a file to the uploads directory using the provided path.
 */
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> },
) {
    try {
        const { path: pathSegments } = await params;

        if (!pathSegments?.length) {
            return NextResponse.json(
                { success: false, error: "Path is required" },
                { status: 400 },
            );
        }

        const formData = await request.formData();
        const file = formData.get("file");

        if (!file || !(file instanceof File)) {
            return NextResponse.json(
                { success: false, error: "File is required" },
                { status: 400 },
            );
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(", ")}`,
                },
                { status: 400 },
            );
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                {
                    success: false,
                    error: `File too large. Max size: ${MAX_FILE_SIZE / 1024 / 1024} MB`,
                },
                { status: 400 },
            );
        }

        const ext = path.extname(file.name) || ".jpg";
        const uniqueName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}${ext}`;
        const relativeDir = path.join(UPLOAD_DIR, ...pathSegments);
        const fullDir = path.join(process.cwd(), relativeDir);
        const filePath = path.join(fullDir, uniqueName);

        await mkdir(fullDir, { recursive: true });

        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filePath, buffer);

        const publicPath = `/uploads/${pathSegments.join("/")}/${uniqueName}`;

        return NextResponse.json({
            success: true,
            url: publicPath,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 },
        );
    }
}

/**
 * RU: Удаляет файл из директории uploads по переданному пути.
 * EN: Deletes a file from the uploads directory using the provided path.
 */
export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> },
) {
    try {
        const { path: pathSegments } = await params;

        if (!pathSegments?.length) {
            return NextResponse.json(
                { success: false, error: "Path is required" },
                { status: 400 },
            );
        }

        const relativePath = path.join(UPLOAD_DIR, ...pathSegments);
        const fullPath = path.join(process.cwd(), relativePath);

        // Защита от path traversal
        const resolvedPath = path.resolve(fullPath);
        const uploadsRoot = path.resolve(process.cwd(), UPLOAD_DIR);
        if (!resolvedPath.startsWith(uploadsRoot)) {
            return NextResponse.json(
                { success: false, error: "Invalid path" },
                { status: 400 },
            );
        }

        await unlink(resolvedPath);

        return NextResponse.json({ success: true });
    } catch (error) {
        const isNotFound =
            error &&
            typeof error === "object" &&
            "code" in error &&
            error.code === "ENOENT";
        if (isNotFound) {
            return NextResponse.json(
                { success: false, error: "File not found" },
                { status: 404 },
            );
        }
        console.error("Delete error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 },
        );
    }
}
