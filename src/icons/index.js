import SvgIcon from "@/components/SvgIcon/index.vue" // Svg Component
import "virtual:svg-icons-register"

export function svgLoader(app) {
  app.component("SvgIcon", SvgIcon)
}