import {get, post} from "@/utils/axios";
export const getTestList = () => {
    const url = "/api/llm_nickname.test_list?site=llm_nickname";
    return get(url)
}

export const deleteList = (id) => {
    const url = "/api/llm_nickname.test_delete?site=llm_nickname";
    const params = new URLSearchParams();
    params.append('id', id);
    return post(url, params)
}

export const createList = (data) => {
    const url = "/api/llm_nickname.test_create?site=llm_nickname";
    return post(url, JSON.stringify({data}))
}

export const getDetailList=(id)=>{
    const url = "/api/llm_nickname.test_detail?site=llm_nickname";
    const params = new URLSearchParams();
    params.append('id', id);
    return post(url, params)
}

export const submitTest=(data)=>{
    const url = "/api/llm_nickname.test_submite_create?site=llm_nickname";
    return post(url, JSON.stringify(data));
}
