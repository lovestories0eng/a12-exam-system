export const questionMap = (questionType) => {
  switch (questionType) {
    case 'choice4': {
      return '单选题'
    }
    case '单选题': {
      return 'choice4'
    }
    case 'choice5': {
      return '五选题'
    }
    case '五选题': {
      return 'choice5'
    }
    case 'fill': {
      return '填空题'
    }
    case '填空题': {
      return 'fill'
    }
    case 'judge': {
      return '判断题'
    }
    case '判断题': {
      return 'judge'
    }
    case 'solve': {
      return '解答题'
    }
    case '解答题': {
      return 'solve'
    }
  }
}
