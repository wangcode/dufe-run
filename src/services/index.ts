import axios from 'axios';

export const TOTAL_STEPS = 20000; // 步
export const TOTAL_LENGTH = 20000; // 米
const token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3RfdG9rZW4iLCJpYXQiOjE2MzEyNDA0ODIsInN1YiI6IntcIm9wZW5JZFwiOlwiMjkzXCIsXCJsb2dpbkRhdGVcIjpcIjIwMjEtMDktMTAgMTA6MjE6MjJcIixcIm9yZ0lkXCI6XCIxZDdkOThkMmE2N2Q0Zjc0YWE0OWE3OTdmNjMwYjI3YlwiLFwib3JnQ29kZVwiOlwiZHVmZVwiLFwidXNlck1vYmlsZVwiOlwiMTU2MTQ0NzIxMDZcIixcInVzZXJOYW1lXCI6XCIxNTYxNDQ3MjEwNlwiLFwidXNlcklkXCI6XCIxYzdkNmYxYjk5ZmM0MjJkOTk5NWM0ZWU2NjI0ZjNlMlwiLFwibmFtZVwiOlwi6bqm5Y-vXCIsXCJ1c2VyTWFjXCI6XCIyMTE0MDMxOTk2MTAyMjgyMTZcIn0iLCJleHAiOjE2MzM4MzI0ODJ9.B5736jMvlp1Nal-tcAFc7Yq8o7sRWB6eVtFgXF9bSjI"

axios.interceptors.request.use(config => {
    config.headers = {
        token
    }

    return config
})

interface SuccessData<T> {
    code: string;
    message: string;
    data: T
}

interface StepsType {
    nowRank: number;
    name: string;
    nowStep: string;
    pic: string;
    allStep: string;
    userId: string;
    allRank: number;
    goodNum: number;
}

const MockStepsData = {
    nowRank: 1000,
    name: "孟浩",
    nowStep: "200",
    pic: "孟浩",
    allStep: "10",
    userId: "2",
    allRank: 2,
    goodNum: 30
}

interface RankType {
    goodFlag: "0"|"1";
    name: string;
    rowStep: string;
    pic: string;
    goodId: string;
    userId: string;
    goodNum: number;
}

const MookRankData: RankType = {
    goodFlag: "0",
    name: "孟浩",
    rowStep: "200",
    pic: "",
    goodId: "1",
    userId: "1",
    goodNum: 100,
}

interface UserStepDetailType {
    followId: string;
    nowRank: number;
    name: string;
    nowStep: string;
    followFlag: "0"|"1";
    pic: string;
    allStep: string;
    userId: string;
    allRank: number;
    goodNum: number;
}

interface UserDetailType {
    name: string;
    pic: string;
    allStep: string;
    userId: string;
    goodNum: number;
    followId: string;
}

interface SearchUserType {
    name: string;
    followFlag: "0"|"1";
    joinFlag: "0"|"1";
    pic: string;
    allStep: string;
    userId: string;
    allRank: string;
    followId: string;
}

/**
 * @name 我的步数
 * @url http://yapi.dufe.tech/project/73/interface/api/9085
 */
export const getMySteps = () => {
    return axios.get<SuccessData<StepsType>>("/alumni/getMySteps").then(res=>res.data.data)
}

/**
 * @name 今日排行榜
 * @url http://yapi.dufe.tech/project/73/interface/api/9091
 */
export const getNowRank = () => {
    return axios.get<SuccessData<RankType[]>>("/alumni/getNowRank").then(res=>res.data.data)
}

/**
 * @name 点赞
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9097
 */
export const StepUpSomeOne = (userId: string) => {
    return axios.post("/alumni/stepUpSomeone", { userId })
}

/**
 * @name 取消点赞
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9103
 */
export const removeStepUp = (userId: string) => {
    return axios.post("/alumni/stepUpSomeone", { userId })
}

/**
 * @name 查看徒步活动人数
 * @url http://yapi.dufe.tech/project/73/interface/api/9109
 */
export const getStepNum = () => {
    return axios.get<SuccessData<{num: number}>>("/alumni/getStepNum").then(res=>res.data.data)
}

/**
 * @name 查看某人的徒步活动
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9115
 */
export const getSomeoneStep = (userId: string) => {
    return axios.post<SuccessData<UserStepDetailType>>("/alumni/getSomeoneStep", { userId }).then(res=>res.data.data)
}

/**
 * @name 我的关注列表
 * @url http://yapi.dufe.tech/project/73/interface/api/9121
 */
export const getMyFollowList = () => {
    return axios.get<SuccessData<UserDetailType[]>>("/alumni/getMyFollowList").then(res=>res.data.data)
}

/**
 * @name 关注某人
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9127
 */
 export const followSomeone = (userId: string) => {
    return axios.post("/alumni/followSomeone", { userId })
}

/**
 * @name 取消关注
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9133
 */
 export const removeFollow = (followId: string) => {
    return axios.post("/alumni/removeFollow", { followId })
}

/**
 * @name 找校友
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9133
 */
 export const getPeopleInStep = (name: string) => {
    return axios.post<SuccessData<SearchUserType[]>>("/alumni/getPeopleInStep", { name }).then(res=>res.data.data)
}