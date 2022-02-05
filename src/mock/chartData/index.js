import {lineData} from "@/mock/chartData/lineData";
import {pieData} from "@/mock/chartData/pieData";
import {raddarData} from "@/mock/chartData/raddarData";
import {subjectData} from "@/mock/chartData/subjectData";

export const getChartData = () => {
  return {
    code: 200,
    data: {
      lineData,
      pieData,
      raddarData,
      subjectData
    }
  }
}
