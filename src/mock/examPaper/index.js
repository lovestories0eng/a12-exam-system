import { questions } from "@/mock/examPaper/questions";
import { list, pageOne, pageTwo } from "@/mock/examPaper/mistakes";
import { examLists } from "@/mock/examPaper/examList";
import {read} from "@/mock/examPaper/read";

export const getExamPaper = () => {
  return {
    code: 200,
    response: questions
  }
}

export const getExamResult = () => {
  return {
    code: 200,
    response: 25
  }
}

export const getList = () => {
  return {
    code: 200,
    response: list
  }
}

export const getPageOne = () => {
  return {
    code: 200,
    response: pageOne
  }
}

export const getPageTwo = () => {
  return {
    code: 200,
    response: pageTwo
  }
}

export const getExamList = () => {
  return {
    code: 200,
    response: examLists
  }
}

export const getReadData = () => {
  return {
    code: 200,
    response: read
  }
}

