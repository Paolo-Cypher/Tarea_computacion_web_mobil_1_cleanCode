import { MIN_RUT_LENGTH, MIN_PASSWORD_LENGTH } from "./constants.js";

// validaciones básicas
export const validateEmail = (email) =>
  typeof email === "string" && email.includes("@") && email.includes(".");


export const validatePassword = (password) =>
  typeof password === "string" && password.length >= MIN_PASSWORD_LENGTH;

export const validatePositiveNumber = (value) =>
  value !== null && !isNaN(value) && Number(value) > 0;

export const validateNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

export const validateNonEmptyArray = (value) =>
  Array.isArray(value) && value.length > 0;

export const validateDate = (value) => {
  if (!value) return false;
  return !isNaN(new Date(value).getTime());
};

// validar rut chileno básico
export const validateRut = (rut) =>
  typeof rut === "string" && rut.length >= MIN_RUT_LENGTH && rut.includes("-");

// utilidades de texto
export const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const truncate = (str, maxLength) =>
  str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;

export const slugify = (str) =>
  str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

// utilidades de arrays
export const sumArray = (arr) => arr.reduce((total, val) => total + val, 0);

export const avgArray = (arr) =>
  arr.length > 0 ? sumArray(arr) / arr.length : 0;

export const uniqueArray = (arr) => [...new Set(arr)];

// utilidades de objetos
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export const isEmptyObj = (obj) => Object.keys(obj).length === 0;

export const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
