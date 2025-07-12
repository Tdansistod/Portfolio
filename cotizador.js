const form = document.querySelector("#cotizador");
const siteType = document.getElementById("siteType");
const design = document.getElementById("design");
const scale = document.getElementById("scale");
const scaleWrap = document.getElementById("scaleWrap");
const totalBox = document.getElementById("totalBox");
const totalAmount = document.getElementById("totalAmount");

/** Estado interno de precios elegidos (en miles) */
const state = { siteType: "", design: "", scale: 0 };

/** Escucha de cambios */
[siteType, design, scale].forEach((sel) =>
  sel.addEventListener("change", handleChange)
);

function handleChange(e) {
  // 1. Actualizar estado
  state[e.target.dataset.field] = parseFloat(e.target.value) || 0;

  // 2. Mostrar / ocultar "Escala" según tipo de sitio
  const isEcom =
    siteType.options[siteType.selectedIndex].dataset.kind === "ecom";

  if (isEcom) {
    scaleWrap.hidden = false;
  } else {
    scaleWrap.hidden = true;
    scale.value = ""; // resetea UI
    state.scale = 0; // resetea cálculo
  }

  // 3. ¿Están completos todos los selects necesarios?
  const basicFilled = siteType.value !== "" && design.value !== "";
  const scaleFilled = !isEcom || scale.value !== "";

  if (!(basicFilled && scaleFilled)) {
    totalBox.hidden = true;
    return;
  }

  // 4. Calcular total (recuerda: los valores son “en miles”)
  const totalMiles = Object.values(state).reduce((sum, v) => sum + v, 0);
  totalAmount.textContent = `ARS $${totalMiles.toLocaleString("es-AR")}.000`;
  totalBox.hidden = false;
}
