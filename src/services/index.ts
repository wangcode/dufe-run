import axios from 'axios';
import qs from 'qs';

export const TOTAL_STEPS = 20000; // 步
export const TOTAL_LENGTH = 20000; // 米

const token = localStorage.getItem("token")

axios.interceptors.request.use(config => {
    config.headers = {
        token,
        "Content-Type": "application/x-www-form-urlencoded"
    }

    return config
})

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

/**
 * @name 我的步数
 * @url http://yapi.dufe.tech/project/73/interface/api/9085
 */
export const getMySteps = () => {
    return axios.get<SuccessData<StepsType>>("http://172.16.1.19:9091/alumni/getMySteps").then(res=>res.data.data)
}

/**
 * @name 今日排行榜
 * @url http://yapi.dufe.tech/project/73/interface/api/9091
 */
export const getNowRank = () => {
    return axios.get<SuccessData<RankType[]>>("http://172.16.1.19:9091/alumni/getNowRank").then(res=>res.data.data)
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
export const removeStepUp = (userId: string) => {
    return axios.post("http://172.16.1.19:9091/alumni/removeStepUp", qs.stringify({ userId }))
}

/**
 * @name 查看徒步活动人数
 * @url http://yapi.dufe.tech/project/73/interface/api/9109
 */
export const getStepNum = () => {
    return axios.get<SuccessData<{num: number}>>("http://172.16.1.19:9091/alumni/getStepNum").then(res=>res.data.data)
}

/**
 * @name 查看某人的徒步活动
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9115
 */
export const getSomeoneStep = (userId: string) => {
    return axios.post<SuccessData<UserStepDetailType>>("http://172.16.1.19:9091/alumni/getSomeoneStep", qs.stringify({userId}) ).then(res=>res.data.data)
}

/**
 * @name 我的关注列表
 * @url http://yapi.dufe.tech/project/73/interface/api/9121
 */
export const getMyFollowList = () => {
    return axios.get<SuccessData<UserDetailType[]>>("http://172.16.1.19:9091/alumni/getMyFollowList").then(res=>res.data.data)
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
    return axios.post<SuccessData<SearchUserType[]>>("http://172.16.1.19:9091/alumni/getPeopleInStep", qs.stringify({ name })).then(res=>res.data.data)
}