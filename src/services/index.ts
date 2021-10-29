import axios, { AxiosError } from 'axios';
import { message } from 'antd';
import qs from 'qs';

// steps === length * 0.5 

export const TOTAL_STEPS = 100000; // 步
export const TOTAL_LENGTH = 20000; // 米

const token = localStorage.getItem("token")
// "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3RfdG9rZW4iLCJpYXQiOjE2MzUxMjMyOTAsInN1YiI6IntcIm9wZW5JZFwiOlwiMjkzXCIsXCJsb2dpbkRhdGVcIjpcIjIwMjEtMTAtMjUgMDg6NTQ6NTBcIixcIm9yZ0lkXCI6XCIxZDdkOThkMmE2N2Q0Zjc0YWE0OWE3OTdmNjMwYjI3YlwiLFwib3JnQ29kZVwiOlwiZHVmZVwiLFwidXNlck1vYmlsZVwiOlwiMTU2MTQ0NzIxMDZcIixcInVzZXJOYW1lXCI6XCIxNTYxNDQ3MjEwNlwiLFwidXNlcklkXCI6XCIxYzdkNmYxYjk5ZmM0MjJkOTk5NWM0ZWU2NjI0ZjNlMlwiLFwibmFtZVwiOlwi6bqm5Y-vXCIsXCJ1c2VyTWFjXCI6XCIyMTE0MDMxOTk2MTAyMjgyMTZcIn0iLCJleHAiOjE2Mzc3MTUyOTB9.eQ5KyRur9UNXkQpGCV0PAfrgErB3Z8mqbnSwyieGA28"

axios.interceptors.request.use(config => {
    config.headers = {
        token: token,
        "Content-Type": "application/x-www-form-urlencoded"
    }

    return config
})

axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 400) {
            message.error(error.response?.data?.message)
        }
        return Promise.reject(error)
    }
)

const apiurl = "/webview/api"

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
    teamId: string;
    teamName: string;
    aveTeamKm: number;
    aveStep: number;
    allKm: number;
    allPoint: number;
}

interface RankType {
    goodFlag: "0" | "1";
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
    followFlag: "0" | "1";
    pic: string;
    allStep: string;
    userId: string;
    allRank: number;
    goodNum: number;
    teamId: string;
    teamName: string;
    aveTeamKm: number;
    aveStep: number;
    allKm: number
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
    followFlag: "0" | "1";
    joinFlag: JoinFlag;
    pic: string;
    allStep: string;
    userId: string;
    allRank: string;
    followId: string;
}

interface MapIntegralType {
    amount: string;
    flag: "0" | "1";
    name: string;
    id: number;
    surplusAmount: number;
    point: string;
}

interface MyTeamType {
    flag: "0" | "1";
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
    followId?: number;
}

interface PropType {
    surUseNum: number;
    name: string;
    id: number;
    pic: string;
    point: string;
    backPic: string;
    useNum: string;
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
    flag: "0" | "1";
    name: string;
    allKm: number;
    pic: string;
    allStep: number;
    userId: string;
    followId?: number
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
    flag: "0" | "1" | "2";
    name: string;
    point: string;
}

interface TeamFollowListType {
    personList: {
        followId: number;
        name: string;
        allKm: number;
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
    return axios.get<SuccessData<StepsType>>(`${apiurl}/alumni/getMySteps`).then(res => res.data.data)
}

/**
 * @name 今日排行榜
 * @url http://yapi.dufe.tech/project/73/interface/api/9091
 */
export const getNowRank = () => {
    return axios.get<SuccessData<RankType[]>>(`${apiurl}/alumni/getNowRank`).then(res => res.data.data)
}

/**
 * @name 点赞
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9097
 */
export const StepUpSomeOne = (userId: string) => {
    return axios.post(`${apiurl}/alumni/stepUpSomeone`, qs.stringify({ userId }))
}

/**
 * @name 取消点赞
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9103
 */
export const removeStepUp = (goodId: string) => {
    return axios.post(`${apiurl}/alumni/removeStepUp`, qs.stringify({ goodId }))
}

/**
 * @name 查看徒步活动人数
 * @url http://yapi.dufe.tech/project/73/interface/api/9109
 */
export const getStepNum = () => {
    return axios.get<SuccessData<{ num: number }>>(`${apiurl}/alumni/getStepNum`).then(res => res.data.data)
}

/**
 * @name 查看某人的徒步活动
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9115
 */
export const getSomeoneStep = (userId: string) => {
    return axios.post<SuccessData<UserStepDetailType>>(`${apiurl}/alumni/getSomeoneStep`, qs.stringify({ userId })).then(res => res.data.data)
}

/**
 * @name 我的关注列表
 * @url http://yapi.dufe.tech/project/73/interface/api/9121
 */
export const getMyFollowList = () => {
    return axios.get<SuccessData<UserDetailType[]>>(`${apiurl}/alumni/getMyFollowList`).then(res => res.data.data)
}

/**
 * @name 关注某人
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9127
 */
export const followSomeone = (userId: string) => {
    return axios.post(`${apiurl}/alumni/followSomeone`, qs.stringify({ userId }))
}

/**
 * @name 取消关注
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9133
 */
export const removeFollow = (followId: string) => {
    return axios.post(`${apiurl}/alumni/removeFollow`, qs.stringify({ followId }))
}

/**
 * @name 找校友
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9133
 */
export const getPeopleInStep = (name: string) => {
    return axios.post<SuccessData<SearchUserType[]>>(`${apiurl}/alumni/getPeopleInStep`, qs.stringify({ name })).then(res => res.data.data)
}

/**
 * @name 查看徒步活动战队总数
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9181
 */
export const getStepTeamNum = () => {
    return axios.get<SuccessData<{ num: number; perNum: number }>>(`${apiurl}/alumni/getStepTeamNum`).then(res => res.data.data)
}

/**
 * @name 地图积分明细
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9187
 */
export const getStepMapIntegral = () => {
    return axios.get<SuccessData<MapIntegralType[]>>(`${apiurl}/alumni/getStepMapIntegral`).then(res => res.data.data)
}

/**
 * @name 领积分
 * @param id
 * @url http://yapi.dufe.tech/project/73/interface/api/9193
 */
export const saveStepIntegral = (id: string) => {
    return axios.post<SuccessData<boolean>>(`${apiurl}/alumni/saveStepIntegral`, qs.stringify({ id })).then(res => res.data.data)
}

/**
 * @name 查看战队/我的战队
 * @param id
 * @url http://yapi.dufe.tech/project/73/interface/api/9199
 */
export const getMyStepTeam = (id: string) => {
    return axios.post<SuccessData<MyTeamType>>(`${apiurl}/alumni/getMyStepTeam`, qs.stringify({ id })).then(res => res.data.data)
}

/**
 * @name 加入战队
 * @param id
 * @url http://yapi.dufe.tech/project/73/interface/api/9205
 */
export const joinStepTeam = (id: string) => {
    return axios.post<SuccessData<boolean>>(`${apiurl}/alumni/joinStepTeam`, qs.stringify({ id })).then(res => res.data.data)
}

/**
 * @name 道具列表
 * @url http://yapi.dufe.tech/project/73/interface/api/9211
 */
export const getStepProp = () => {
    return axios.get<SuccessData<PropType[]>>(`${apiurl}/alumni/getStepProp`).then(res => res.data.data)
}

/**
 * @name 道具详细信息
 * @param id
 * @url http://yapi.dufe.tech/project/73/interface/api/9217
 */
export const getStepPropInfo = (id: number) => {
    return axios.post<SuccessData<PropDetailType>>(`${apiurl}/alumni/getStepPropInfo`, qs.stringify({ id })).then(res => res.data.data)
}

/**
 * @name 使用道具
 * @param id
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9223
 */
export const useStepProp = ({ id, userId }: { id: string, userId: string }) => {
    return axios.post<SuccessData<boolean>>(`${apiurl}/alumni/useStepProp`, qs.stringify({ id, userId })).then(res => res.data.data)
}

/**
 * @name 全部战队
 * @url http://yapi.dufe.tech/project/73/interface/api/9229
 */
export const getAllStepTeam = () => {
    return axios.get<SuccessData<TeamType[]>>(`${apiurl}/alumni/getAllStepTeam`).then(res => res.data.data)
}

/**
 * @name 战队成员
 * @param id
 * @param name
 * @url http://yapi.dufe.tech/project/73/interface/api/9235
 */
export const getStepTeamPerson = (id: string, name?: string) => {
    return axios.post<SuccessData<TeamUserType[]>>(`${apiurl}/alumni/getStepTeamPerson`, qs.stringify({ id, name })).then(res => res.data.data)
}

/**
 * @name 我的队内排名
 * @url http://yapi.dufe.tech/project/73/interface/api/9241
 */
export const getMyStepTeamPersonRank = () => {
    return axios.get<SuccessData<MyTeamRankType>>(`${apiurl}/alumni/getMyStepTeamPersonRank`).then(res => res.data.data)
}

/**
 * @name 关注战队
 * @param id
 * @url http://yapi.dufe.tech/project/73/interface/api/9247
 */
export const followStepTeam = (id: string) => {
    return axios.post<SuccessData<boolean>>(`${apiurl}/alumni/followStepTeam`, qs.stringify({ id })).then(res => res.data.data)
}

/**
 * @name 关注战队中的某人
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9253
 */
export const followStepTeamPerson = (userId: string) => {
    return axios.post<SuccessData<boolean>>(`${apiurl}/alumni/followStepTeamPerson`, qs.stringify({ userId })).then(res => res.data.data)
}

/**
 * @name 取消关注战队/人员
 * @param id
 * @url http://yapi.dufe.tech/project/73/interface/api/9259
 */
export const removeFollowStepTeam = (id: string) => {
    return axios.post<SuccessData<boolean>>(`${apiurl}/alumni/removeFollowStepTeam`, qs.stringify({ id })).then(res => res.data.data)
}

/**
 * @name 对他人使用道具记录
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9265
 */
export const propUseOther = () => {
    return axios.get<SuccessData<PropUsageLogType[]>>(`${apiurl}/alumni/propUseOther`).then(res => res.data.data)
}

/**
 * @name 被使用道具记录
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9271
 */
export const propUseMe = () => {
    return axios.get<SuccessData<PropUsageLogType[]>>(`${apiurl}/alumni/propUseMe`).then(res => res.data.data)
}

/**
 * @name 个人累计积分列表
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9277
 */
export const getCumIntegral = () => {
    return axios.get<SuccessData<PointType[]>>(`${apiurl}/alumni/getCumIntegral`).then(res => res.data.data)
}

/**
 * @name 战队赛的关注列表
 * @param followId
 * @url http://yapi.dufe.tech/project/73/interface/api/9283
 */
export const getStepTeamFollow = () => {
    return axios.get<SuccessData<TeamFollowListType>>(`${apiurl}/alumni/getStepTeamFollow`).then(res => res.data.data)
}
