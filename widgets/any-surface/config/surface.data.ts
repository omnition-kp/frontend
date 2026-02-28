import { SurfaceBlockProps } from "../types/surface-block.props";

export const LEFT_SURFACE_DATA: SurfaceBlockProps = {
    title: "интерьер",
    photo: "/any-surface/left.png",
    data: [
        "Декоративные монолитные полы терраццо",
        "Декоративные полы из плит",
        "Полы для парковок высокопрочные",
        "Лестницы и ступени",
        "Стеновые панели",
    ],
};

export const RIGHT_SURFACE_DATA: SurfaceBlockProps = {
    title: "экстерьерн",
    photo: "/any-surface/right.png",
    data: [
        "Лестницы, Ступени и стеновые панели",
        "Цоколи архитектурные",
        "Стилобат и другие уличные поверхности",
        "МАФ и элементы благоустройства",
    ],
};

export const SURFACE_DATA = [LEFT_SURFACE_DATA, RIGHT_SURFACE_DATA];
