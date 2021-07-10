"use strict";

/* global require */

/**
 * Module Imports
 */

const R = require("ramda");
const Handler = require("./utils/handlers");
const { Storage } = require("./utils/business");

/**
 * Adding Handlers To The DOM
 */

// Button Handlers

const getBtnHandler = R.cond([
  [R.equals("calculator_number_btn"), R.always(Handler.handleCalculatorNumber)],
  [R.equals("calculator_action_btn"), R.always(Handler.handleCalculatorAction)],
  [
    R.equals("calculator_operator_btn"),
    R.always(Handler.handleCalculatorOperator),
  ],
  [R.equals("calculator_equal_btn"), R.always(Handler.handleCalculatorEqual)],
  [R.T, R.always(() => undefined)],
]);

document.body.addEventListener("click", (e) =>
  getBtnHandler(e.target.id)(e.target.value)
);

// Checkbock Handler

const checkBoxTheme = document.getElementById("theme_checkbox");

checkBoxTheme.addEventListener(
  "change",
  R.pipe(R.path(["target", "checked"]), Handler.handleChangeTheme)
);

checkBoxTheme.checked = R.ifElse(
  R.equals("light"),
  R.always(true),
  R.always(false)
)(Storage.theme.get());

checkBoxTheme.dispatchEvent(new Event("change"));
