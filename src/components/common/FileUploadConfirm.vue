<template>
  <v-dialog v-model="show" max-width="350" persistent>
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ content }}</v-card-text>
      <v-card-actions>
        <v-btn color="secondary white--text" @click="onCancel">取消</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green white--text" @click="onFile">{{ fileTxt }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" @click="onCapture">{{ captureTxt }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      default: false
    },
    title: {
      default: "提示"
    },
    content: {
      default: "请选择上传附件方式："
    },
    fileTxt: {
      default: "照片图库"
    },
    captureTxt: {
      default: "直接拍照"
    },
    onFile: {
      type: Function
    },
    onCapture: {
      type: Function
    },
    onCancel: {
      type: Function
    }
  },
  methods: {
    clickFile() {
      this.onFile && this.onFile();
    },
    clickCapture() {
      this.onCapture && this.onCapture();
    },
    clickCancel() {
      this.onCancel && this.onCancel();
    }
  }
};
</script>

<style></style>
