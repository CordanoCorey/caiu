import { Collection } from './collection';
import { DateHelper } from './date';
import { LookupValue } from './lookup';
import { build } from './utils';

export class Question {
    answer?: any;
    lookup?: LookupValue;
    key: string | number;
    question = '';
    title?= '';
    type?: string | AnswerType;
}

export type AnswerType = 'date' | 'monthyear' | 'yesno';

export class Questions extends Collection<Question> {

    static AnswerQuestions(questions: Question[], answers: any): Question[] {
        return questions.map(question => Questions.AnswerQuestion(question, answers[question.key]));
    }

    static AnswerQuestion(question: Question, answerData: any): Question {
        let answer = answerData;
        switch (question.type) {
            case 'date':
                answer = answerData;
                break;
            case 'monthyear':
                answer = DateHelper.ToMonthYearName(answerData);
                break;
            case 'yesno':
                answer = answerData ? 'Yes' : 'No';
                break;
        }
        return build(Question, question, { answer });
    }

    answerQuestions(answers: any): Question[] {
        return Questions.AnswerQuestions(this.toArray(), answers);
    }
}

export abstract class QuestionsModel {
    ignore = ['isAdd', 'questions'];
    abstract questions: Question[];

    get answers(): Question[] {
        return Questions.AnswerQuestions(this.questions, this);
    }
}
