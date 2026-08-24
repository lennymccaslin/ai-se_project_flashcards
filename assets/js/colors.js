const colorMap = {
  green: "#64d583",
  blue: "#91a8f9",
  orange: "#ee955e",
  pink: "#ee92d7",
  purple: "#aa8ef0",
  yellow: "#f5d770",
  default: "#64d583",
};

/**
 * Accepts a hexadecimal string and returns the corresponding color name key,
 * if found in colorMap. If a match isn't found, null is returned.
 *
 * @param {string} hexValue
 * @returns a color name string
 */
function hexToString(hexValue) {
  const colorString = Object.keys(colorMap).find((key) => {
    return colorMap[key] === hexValue;
  });

  return colorString || null;
}

/**
 * Accepts an HTML element and removes all BEM "_color_" modifiers from its
 * class list.
 *
 * @param {HTMLElement} element
 */
function removeColorClasses(element) {
  [...element.classList].forEach((cls) => {
    if (cls.includes("_color_")) {
      element.classList.remove(cls);
    }
  });
}

export { hexToString, removeColorClasses };