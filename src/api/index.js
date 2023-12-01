import service from "@/utils/request";

export const getTestList = () => {
    const url = "/llm_nickname.test_list";
    return service({
        url,
        method: "get"
    })
}

export const getDetailList = (id) => {
    const url = "/llm_nickname.test_detail";
    return service({
        url,
        method: "post",
        params: {
            id,
        }
    })
}

export const deleteList = (id) => {
    const url = "/llm_nickname.test_delete";
    return service({
        url,
        method: "post",
        params: {
            id,
        }
    })
}

export const createList = (data) => {
    const url = "/llm_nickname.test_create";
    return service({
        url,
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            data,
        }
    })
}

export const submitTest = (data) => {
    const url = "/llm_nickname.test_submit_create";
    return service({
        url,
        method: "post",
        data,
    })
}

export const getSetting = () => {
    const url = "/llm_nickname.setting";
    return service({
        url,
        method: "get",
    })
}
