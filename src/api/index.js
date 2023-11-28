import service from "@/utils/request";
export const getTestList = () => {
    const url = "/llm_nickname.test_list";
    return service({
        url,
        method:"get"
    })
}

export const getDetailList=(id)=>{
    const url = "/llm_nickname.test_detail";
    return service({
        url,
        method:"post",
        params:{
            id,
        }
    })

}

export const deleteList = (id) => {
    const url = "/llm_nickname.test_delete";
    return service({
        url,
        method:"post",
        params:{
            id,
        }
    })
}

export const createList=(data) => {
    const url = "/llm_nickname.test_create";
    return service({
        url,
        method:"post",
        data:{
            data,
        }
    })
}

export const submitTest=(data)=>{
    const url = "/llm_nickname.test_submite_create";
    return service({
        url,
        method:"post",
        data:{
            data,
        }
    })
}
