export const questionMap = (questionType) => {
  switch (questionType) {
    case 'choice4': {
      return '单选题'
    }
    case 'choice5': {
      return '五选题'
    }
    case 'fill': {
      return '填空题'
    }
    case 'judge': {
      return '判断题'
    }
  }
}
