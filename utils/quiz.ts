import { ProblemModel } from "../hooks/requests/models"

const formats = {
  number: /^\$\d+\$$/,
}

export const determineAnswerFormat = (answer: string) => {
  for (const [format, regex] of Object.entries(formats)) {
    if (regex.test(answer)) return format as ProblemModel["answer_format"]
  }

  throw new Error(`Could not determine answer format for ${answer}`)
}
