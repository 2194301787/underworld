<template>
    <div class="underTabelLabel">
        <div class="underTabelLabel_icon"></div>
        <div class="underTabelLabel_text">{{ underTitle }}</div>
    </div>
</template>

<script>
export default {
    props: {
        underTitle: {
            type: [String, Number],
            default: "内容"
        }
    }
}
</script>

<style scoped>
.underTabelLabel {
    display: flex;
    align-items: center;
}
.underTabelLabel_icon {
    width: 8px;
    height: 21px;
    background-color: rgb(0, 153, 255);
}
.underTabelLabel_text {
    font-family: "Arial Normal", "Arial";
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    margin-left: 12px;
}
</style>
