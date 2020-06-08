<template>
  <v-dialog v-model="show" max-width="330" persistent>
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ content }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" @click="clickCancel">{{ cancelTxt }}</v-btn>
        <v-btn color="primary darken-1" :loading="ing" v-if="confirmTxt" @click="clickConfirm">{{ confirmTxt }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    show: {
      default: false
    },
    ing: {
      default: false
    },
    title: {
      default: "标题"
    },
    content: {
      default: "提示内容"
    },
    confirmTxt: {
      default: "确定"
    },
    cancelTxt: {
      default: "取消"
    },
    onConfirm: {
      type: Function
    },
    onCancel: {
      type: Function
    }
  },
  methods: {
    clickConfirm() {
      this.onConfirm && this.onConfirm();
    },
    clickCancel() {
      this.onCancel && this.onCancel();
    }
  }
};
</script>

<style></style>
