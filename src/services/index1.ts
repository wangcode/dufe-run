import axios, { AxiosError } from 'axios';
import qs from 'qs';
import Toast from 'light-toast';

export const TOTAL_STEPS = 20000; // 步
export const TOTAL_LENGTH = 30000; // 米
const token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3RfdG9rZW4iLCJpYXQiOjE2MzEyNDA0ODIsInN1YiI6IntcIm9wZW5JZFwiOlwiMjkzXCIsXCJsb2dpbkRhdGVcIjpcIjIwMjEtMDktMTAgMTA6MjE6MjJcIixcIm9yZ0lkXCI6XCIxZDdkOThkMmE2N2Q0Zjc0YWE0OWE3OTdmNjMwYjI3YlwiLFwib3JnQ29kZVwiOlwiZHVmZVwiLFwidXNlck1vYmlsZVwiOlwiMTU2MTQ0NzIxMDZcIixcInVzZXJOYW1lXCI6XCIxNTYxNDQ3MjEwNlwiLFwidXNlcklkXCI6XCIxYzdkNmYxYjk5ZmM0MjJkOTk5NWM0ZWU2NjI0ZjNlMlwiLFwibmFtZVwiOlwi6bqm5Y-vXCIsXCJ1c2VyTWFjXCI6XCIyMTE0MDMxOTk2MTAyMjgyMTZcIn0iLCJleHAiOjE2MzM4MzI0ODJ9.B5736jMvlp1Nal-tcAFc7Yq8o7sRWB6eVtFgXF9bSjI"

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

const makeUserDetail = (id: number) => ({
    name: `User-${id}`,
    pic: "",
    allStep: (Math.random() * 8000).toFixed(0),
    userId: id.toString(),
    goodNum: (Math.random() * 80).toFixed(0),
    followId: id.toString(),
})

const makeRank = (id: number): RankType => {
    return {
        goodFlag: GoodFlag.good,
        name: `孟浩-${id}`,
        nowStep: (Math.random() * 8000).toFixed(0),
        pic: "",
        goodId: `${id}`,
        userId: `${id}`,
        goodNum: parseInt((Math.random() * 80).toFixed(0))
    }
}

const makeUserStepDetail = (id: number): UserStepDetailType => {
    return {
        followId: `${id}`,
        nowRank: 1,
        name: `孟浩-${id}`,
        nowStep: (Math.random() * 2000).toFixed(0),
        followFlag: FollowFlag.follow,
        pic: "",
        allStep: (Math.random() * 8000).toFixed(0),
        userId: `${id}`,
        allRank: 2,
        goodNum: 3,
    }
}

const fakeMySteps: StepsType = {
    nowRank: 122,
    name: "孟浩",
    nowStep: "1200",
    pic: "",
    allStep: "5000",
    userId: "559",
    allRank: 1,
    goodNum: 22
}

/**
 * @name 我的步数
 * @url http://yapi.dufe.tech/project/73/interface/api/9085
 */
export const getMySteps = () => {
    return Promise.resolve(fakeMySteps)
}

/**
 * @name 今日排行榜
 * @url http://yapi.dufe.tech/project/73/interface/api/9091
 */
export const getNowRank = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8].map(item => makeRank(item))
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
    return Promise.resolve(201)
}

/**
 * @name 查看某人的徒步活动
 * @param userId
 * @url http://yapi.dufe.tech/project/73/interface/api/9115
 */
export const getSomeoneStep = (userId: string) => {
    return Promise.resolve(makeUserStepDetail(parseInt(userId)))
}

/**
 * @name 我的关注列表
 * @url http://yapi.dufe.tech/project/73/interface/api/9121
 */
export const getMyFollowList = () => {
    return Promise.resolve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => makeUserDetail(item)))
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