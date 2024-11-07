const fs = require("fs");

let file = fs.readFileSync("./lib/database.types.ts").toString();

function fixFieldsForInstance(instance) {
  const instanceIndex = file.indexOf(instance);

  let start = (current = file.indexOf("{", instanceIndex));
  let bracketCount = 1;
  while (bracketCount > 0) {
    current++;
    if (file[current] === "{") {
      bracketCount++;
    } else if (file[current] === "}") {
      bracketCount--;
    }
  }
  let end = current;

  const fields = [
    "created_at",
    "category_name",
    "difficulty",
    "display_image",
    "display_name",
    "explanation",
    "name",
    "order",
    "id",
  ];

  for (const field of fields) {
    let replacing = true;
    while (replacing) {
      replacing = false;
      for (const variation of [
        `${field}: string | null`,
        `${field}: number | null`,
        `${field}?: string | null`,
        `${field}?: number | null`,
      ]) {
        const index = file.indexOf(variation, start);
        if (index > end || index === -1) continue;

        console.log(
          `Replacing '${file.substring(index, index + variation.length)}' with '${variation.split(" |")[0]}'`,
        );

        const oldFileLength = file.length;
        file =
          file.substring(0, index) +
          variation.split(" |")[0] +
          file.substring(index + variation.length);
        const newFileLength = file.length;

        end -= oldFileLength - newFileLength;
        replacing = true;
      }
    }
  }
}

fixFieldsForInstance("mathgen_models_view:");
fixFieldsForInstance("get_trick_of_the_day:");

fs.writeFileSync("./lib/database.types.ts", file);
