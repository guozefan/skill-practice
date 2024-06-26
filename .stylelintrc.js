/**
 * @module .stylelintrc
 * @author: huoyou
 * @description: css校验配置
 */
module.exports = {
  extends: ["stylelint-config-standard-scss", "stylelint-config-prettier"],
  rules: {
    "declaration-colon-space-after": "always-single-line",
    "declaration-colon-space-before": "never",
    "declaration-block-trailing-semicolon": null,
    "declaration-block-semicolon-space-before": "never",
    "media-feature-name-no-unknown": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep"],
      },
    ],
    "rule-empty-line-before": [
      "always",
      {
        ignore: ["after-comment", "first-nested"],
      },
    ],
    // style calc中使用v-bind
    "function-calc-no-unspaced-operator": null,
  },
};
