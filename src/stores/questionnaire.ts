import {ref} from "vue";
import { defineStore } from 'pinia'

export const useQuestionnaire = defineStore('questionnaire', ()=>{
    const questionnaires=ref({});
    return {questionnaires}
})
