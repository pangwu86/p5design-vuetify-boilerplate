<template>
  <div class="page">
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-img height="100%" :src="img404"> </v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import img404 from "@/assets/404.jpg";
export default {
  data() {
    return {
      img404: img404
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="scss"></style>
