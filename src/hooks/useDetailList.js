import {onMounted, ref} from "vue";
import {getDetailList} from "@/api";

export function useDetailList() {
    const historyParam = history.state;
    const url = window.location.href
    const idFromUrl = url.split('?id=')[1]
    const id = historyParam.id || idFromUrl;
    const evaluatingData = ref({})
    onMounted(() => {
        getDetailList(id).then(res => {
            let {ai_nicknames, real_nicknames,qst_group_num, qst_total_num, question_type} = res;
            ai_nicknames = ai_nicknames.split("\n");
            real_nicknames = real_nicknames.split("\n");
            evaluatingData.value = res;
            evaluatingData.value.ai_nicknames = ai_nicknames;
            evaluatingData.value.real_nicknames = real_nicknames;
            evaluatingData.value.nameGroups = getGroupNames(real_nicknames, ai_nicknames, qst_group_num, qst_total_num, question_type);
        })
    })
    return evaluatingData
}

function getGroupNames(realNames, aiNames, oneGroupNameNum, allNamesNum, questionType) {
    const result = [];
    if (questionType === 0 || questionType === 2) {
        let i = 0;
        while (i < allNamesNum) {
            if (i % oneGroupNameNum === 0) {
                const randNumber = Math.random();
                let option;
                if (randNumber < 0.5) {
                    option = {
                        realNamesGroup: {
                            names: [],
                        }, aiNamesGroup: {
                            names: [],
                        },
                    }
                } else {
                    option = {
                        aiNamesGroup: {
                            names: [],
                        }, realNamesGroup: {
                            names: [],
                        },
                    }
                }
                result.push(option);
            }
            const resLength = result.length;
            result[resLength - 1].realNamesGroup.names.push(realNames[i]);
            result[resLength - 1].aiNamesGroup.names.push(aiNames[i]);
            i++;
        }
        return result;
    } else if (questionType === 1) {
        const groupNum = allNamesNum / oneGroupNameNum;
        let i = 0, n = 0, m = 0;
        while (i < groupNum) {
            const randNumber = Math.random();
            let names;
            let isRealName;
            if (randNumber < 0.5) {
                names = realNames.slice(n * oneGroupNameNum, (n + 1) * oneGroupNameNum);
                n++;
                isRealName = true;
            } else {
                names = aiNames.slice(m * oneGroupNameNum, (m + 1) * oneGroupNameNum);
                m++;
                isRealName = false;
            }
            result.push({
                names, isRealName, option: {
                    true: {
                        value: '正确',
                    }, false: {
                        value: '错误',
                    }
                }
            });
            i++
        }
    }
    return result
}
