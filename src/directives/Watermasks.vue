<script>
export default {
  name: 'Watermasks',
  bind: (el, binding) => {
    const instance = binding.value
    const watermasksImg = instance.$store.getters.watermasksImg
    el.style.backgroundImage = `URL(${watermasksImg})`
  }

}
</script>
