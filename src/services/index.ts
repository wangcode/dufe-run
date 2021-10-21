import axios, { AxiosError } from 'axios';
import qs from 'qs';
import Toast from 'light-toast';

export const TOTAL_STEPS = 20000; // 步
export const TOTAL_LENGTH = 20000; // 米

const token = localStorage.getItem("token")
// const token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3RfdG9rZW4iLCJpYXQiOjE2MzEyNDA0ODIsInN1YiI6IntcIm9wZW5JZFwiOlwiMjkzXCIsXCJsb2dpbkRhdGVcIjpcIjIwMjEtMDktMTAgMTA6MjE6MjJcIixcIm9yZ0lkXCI6XCIxZDdkOThkMmE2N2Q0Zjc0YWE0OWE3OTdmNjMwYjI3YlwiLFwib3JnQ29kZVwiOlwiZHVmZVwiLFwidXNlck1vYmlsZVwiOlwiMTU2MTQ0NzIxMDZcIixcInVzZXJOYW1lXCI6XCIxNTYxNDQ3MjEwNlwiLFwidXNlcklkXCI6XCIxYzdkNmYxYjk5ZmM0MjJkOTk5NWM0ZWU2NjI0ZjNlMlwiLFwibmFtZVwiOlwi6bqm5Y-vXCIsXCJ1c2VyTWFjXCI6XCIyMTE0MDMxOTk2MTAyMjgyMTZcIn0iLCJleHAiOjE2MzM4MzI0ODJ9.B5736jMvlp1Nal-tcAFc7Yq8o7sRWB6eVtFgXF9bSjI"

axios.interceptors.request.use(config => {
    config.headers = {
        token,
        "Content-Type": "application/x-www-form-urlencoded"
    }

    return config
})

axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 400) {
            Toast.fail(error.response?.data?.message)
        }
        return Promise.reject(error)
    }
)


export enum FollowFlag {
    follow = "1",
    unFollow = "0"
}

export enum GoodFlag {
    good = "1",
    unGood = "0"
}

export enum JoinFlag {
    join = "1",
    unJoin = "0"
}

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

interface RankType {
    goodFlag: GoodFlag;
    name: string;
    nowStep: string;
    pic: string;
    goodId: string;
    userId: string;
    goodNum: number;
}

interface UserStepDetailType {
    followId: string;
    nowRank: number;
    name: string;
    nowStep: string;
    followFlag: FollowFlag;
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
    followFlag: FollowFlag;
    joinFlag: JoinFlag;
    pic: string;
    allStep: string;
    userId: string;
    allRank: string;
    followId: string;
}

interface MapIntegralType {
    amount: string;
    flag: "0"|"1";
    name: string;
    id: number;
    surplusAmount: number;
    point: string;
}

interface MyTeamType {
    flag: "0"|"1";
    aveStep: number;
    name: string;
    allKm: number;
    id: number;
    pic: string;
    personNum: number;
    allStep: number;
    aveKm: number;
    allRank: number;
    info: string;
}

interface PropType {
    surUseNum: number;
    name: string;
    id: number;
    pic: string;
    point: string;
}

interface PropDetailType extends PropType {
    useNum: string;
    info: string;
}

interface TeamType {
    flag: string;
    name: string;
    id: number;
    pic: string;
    personNum: number;
    allStep: number;
    aveKm: number;
    followId: number;
}

interface TeamUserType {
    flag: "0"|"1";
    name: string;
    allKm: number;
    pic: string;
    allStep: number;
    userId: string;
    followId: number
}

interface MyTeamRankType {
    name: string;
    allKm: number;
    pic: string;
    allStep: number;
    userId: string;
    allRank: number
}

interface PropUsageLogType {
    receivedId: string;
    createTime: string;
    name: string;
    stepNum: string;
    propName: string;
}

interface PointType {
    id: number;
    flag: "0"|"1"|"2";
    name: string;
    point: string;
}

interface TeamFollowListType {
    personList: {
        followId: number;
        name: string;
        allkm: number;
        pic: string;
        userId: string;
    }[];
    teamList: {
        followId: number;
        teamId: string;
        name: string;
        allKm: number;
        pic: string;
    }[]
}

/**
 * @name 我的步数
 * @url http://yapi.dufe.tech/project/73/interface/api/9085
 */
export const getMySteps = () => {
    return axios.get<SuccessData<StepsType>>("http://172.16.1.19:9091/alumni/getMySteps").then(res => res.data.data)
}

/**
 * @name 今日排行榜
 * @url http://yapi.dufe.tech/project/73/interface/api/9091
 */
export const getNowRank = () => {
    return axios.get<SuccessData<RankType[]>>("http://172.16.1.19:9091/alumni/getNowRank").then(res => res.data.data)
}

/**
 * @name 点赞
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9097
 */
export const StepUpSomeOne = (userId: string) => {
    return axios.post("http://172.16.1.19:9091/alumni/stepUpSomeone", qs.stringify({ userId }))
}

/**
 * @name 取消点赞
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9103
 */
export const removeStepUp = (goodId: string) => {
    return axios.post("http://172.16.1.19:9091/alumni/removeStepUp", qs.stringify({ goodId }))
}

/**
 * @name 查看徒步活动人数
 * @url http://yapi.dufe.tech/project/73/interface/api/9109
 */
export const getStepNum = () => {
    return axios.get<SuccessData<{ num: number }>>("http://172.16.1.19:9091/alumni/getStepNum").then(res => res.data.data)
}

/**
 * @name 查看某人的徒步活动
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9115
 */
export const getSomeoneStep = (userId: string) => {
    return axios.post<SuccessData<UserStepDetailType>>("http://172.16.1.19:9091/alumni/getSomeoneStep", qs.stringify({ userId })).then(res => res.data.data)
}

/**
 * @name 我的关注列表
 * @url http://yapi.dufe.tech/project/73/interface/api/9121
 */
export const getMyFollowList = () => {
    return axios.get<SuccessData<UserDetailType[]>>("http://172.16.1.19:9091/alumni/getMyFollowList").then(res => res.data.data)
}

/**
 * @name 关注某人
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9127
 */
export const followSomeone = (userId: string) => {
    return axios.post("http://172.16.1.19:9091/alumni/followSomeone", qs.stringify({ userId }))
}

/**
 * @name 取消关注
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9133
 */
export const removeFollow = (followId: string) => {
    return axios.post("http://172.16.1.19:9091/alumni/removeFollow", qs.stringify({ followId }))
}

/**
 * @name 找校友
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9133
 */
export const getPeopleInStep = (name: string) => {
    return axios.post<SuccessData<SearchUserType[]>>("http://172.16.1.19:9091/alumni/getPeopleInStep", qs.stringify({ name })).then(res => res.data.data)
}

/**
 * @name 查看徒步活动战队总数
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9181
 */
 export const getStepTeamNum = () => {
    return axios.get<SuccessData<{num: number; perNum: number}>>("http://172.16.1.19:9091/alumni/getStepTeamNum").then(res => res.data.data)
}

/**
 * @name 地图积分明细
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9187
 */
 export const getStepMapIntegral = () => {
    return axios.get<SuccessData<MapIntegralType[]>>("http://172.16.1.19:9091/alumni/getStepMapIntegral").then(res => res.data.data)
}

/**
 * @name 领积分
 * @param id
 * @url http://yapi.dufe.tech/project/73/interface/api/9193
 */
 export const saveStepIntegral = (id: string) => {
    return axios.post<SuccessData<boolean>>("http://172.16.1.19:9091/alumni/saveStepIntegral", qs.stringify({ id })).then(res => res.data.data)
}

/**
 * @name 查看战队/我的战队
 * @param id
 * @url http://yapi.dufe.tech/project/73/interface/api/9199
 */
 export const getMyStepTeam = (id: string) => {
    return axios.post<SuccessData<MyTeamType>>("http://172.16.1.19:9091/alumni/getMyStepTeam", qs.stringify({ id })).then(res => res.data.data)
}

/**
 * @name 加入战队
 * @param id
 * @url http://yapi.dufe.tech/project/73/interface/api/9205
 */
 export const joinStepTeam = (id: string) => {
    return axios.post<SuccessData<boolean>>("http://172.16.1.19:9091/alumni/getStepProp", qs.stringify({ id })).then(res => res.data.data)
}

/**
 * @name 道具列表
 * @url http://yapi.dufe.tech/project/73/interface/api/9211
 */
 export const getStepProp = () => {
    return axios.get<SuccessData<PropType[]>>("http://172.16.1.19:9091/alumni/getStepProp").then(res => res.data.data)
}

/**
 * @name 道具详细信息
 * @param id
 * @url http://yapi.dufe.tech/project/73/interface/api/9217
 */
 export const getStepPropInfo = (id: string) => {
    return axios.post<SuccessData<PropDetailType>>("http://172.16.1.19:9091/alumni/getStepPropInfo", qs.stringify({ id })).then(res => res.data.data)
}

/**
 * @name 使用道具
 * @param id
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9223
 */
 export const useStepProp = (id: string, userId: string) => {
    return axios.post<SuccessData<boolean>>("http://172.16.1.19:9091/alumni/useStepProp", qs.stringify({ id, userId })).then(res => res.data.data)
}

/**
 * @name 全部战队
 * @url http://yapi.dufe.tech/project/73/interface/api/9229
 */
 export const getAllStepTeam = () => {
    return axios.get<SuccessData<TeamType[]>>("http://172.16.1.19:9091/alumni/getAllStepTeam").then(res => res.data.data)
}

/**
 * @name 战队成员
 * @param id
 * @param name
 * @url http://yapi.dufe.tech/project/73/interface/api/9235
 */
 export const getStepTeamPerson = (id: string, name?: string) => {
    return axios.post<SuccessData<TeamUserType[]>>("http://172.16.1.19:9091/alumni/getStepTeamPerson", qs.stringify({ id, name })).then(res => res.data.data)
}

/**
 * @name 我的队内排名
 * @url http://yapi.dufe.tech/project/73/interface/api/9241
 */
 export const getMyStepTeamPersonRank = () => {
    return axios.get<SuccessData<MyTeamRankType>>("http://172.16.1.19:9091/alumni/getMyStepTeamPersonRank").then(res => res.data.data)
}

/**
 * @name 关注战队
 * @param id
 * @url http://yapi.dufe.tech/project/73/interface/api/9247
 */
 export const followStepTeam = (id: string) => {
    return axios.post<SuccessData<boolean>>("http://172.16.1.19:9091/alumni/followStepTeam", qs.stringify({ id })).then(res => res.data.data)
}

/**
 * @name 关注战队中的某人
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9253
 */
 export const followStepTeamPerson = (userId: string) => {
    return axios.post<SuccessData<boolean>>("http://172.16.1.19:9091/alumni/followStepTeamPerson", qs.stringify({ userId })).then(res => res.data.data)
}

/**
 * @name 取消关注战队/人员
 * @param id
 * @url http://yapi.dufe.tech/project/73/interface/api/9259
 */
 export const removeFollowStepTeam = (id: string) => {
    return axios.post<SuccessData<boolean>>("http://172.16.1.19:9091/alumni/removeFollowStepTeam", qs.stringify({ id })).then(res => res.data.data)
}

/**
 * @name 对他人使用道具记录
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9265
 */
 export const propUseOther = () => {
    return axios.get<SuccessData<PropUsageLogType[]>>("http://172.16.1.19:9091/alumni/propUseOther").then(res => res.data.data)
}

/**
 * @name 被使用道具记录
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9271
 */
 export const propUseMe = () => {
    return axios.get<SuccessData<PropUsageLogType[]>>("http://172.16.1.19:9091/alumni/propUseMe").then(res => res.data.data)
}

/**
 * @name 个人累计积分列表
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9277
 */
 export const getCumIntegral = () => {
    return axios.get<SuccessData<PointType[]>>("http://172.16.1.19:9091/alumni/getCumIntegral").then(res => res.data.data)
}

/**
 * @name 战队赛的关注列表
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9283
 */
 export const getStepTeamFollow = () => {
    return axios.get<SuccessData<TeamFollowListType>>("http://172.16.1.19:9091/alumni/getStepTeamFollow").then(res => res.data.data)
}