export function copyByValue(value: any): any {
  /*
    use recursive strategy to perform a deep copy by value of any type of variable.
    meant to handle deep nested variables that shallow javascript copy functions cannot perform.
  */
  let cloneValue: any;

  // handle the primitive data types, and null/undefined
  if (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "bigint" ||
    typeof value === "boolean" ||
    typeof value === "symbol"
  ) {
    return value;
  }

  // handle array
  if (value instanceof Array) {
    cloneValue = [];
    for (let i = 0; i < value.length; i += 1) {
      cloneValue[i] = copyByValue(value[i]);
    }
    return cloneValue;
  }

  // handle object
  if (value instanceof Object) {
    cloneValue = {};
    for (const attr in value) {
      if (attr in value) {
        cloneValue[attr] = copyByValue(value[attr]);
      }
    }
    return cloneValue;
  }

  // handle date
  if (value instanceof Date) {
    cloneValue = new Date();
    cloneValue.setTime(value.getTime());
    return cloneValue;
  }

  // handle set
  if (value instanceof Set) {
    cloneValue = new Set();
    value.forEach((val: any) => cloneValue.add(copyByValue(val)));
    return cloneValue;
  }

  throw new Error(
    `Unable to clone by value! Value ${typeof value} is not supported.`
  );
}

export function sleep(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
