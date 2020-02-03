<template>
   <div id="tabbar">
      <slot></slot>
   </div>
</template>

<script>
export default {
  name: 'Tabbar'
}
</script>

<style>


#tabbar {
    display:flex; 
    background-color: yellow;
    position: fixed;
    left: 0;
    bottom: 0;
    right:0;
}

</style>
