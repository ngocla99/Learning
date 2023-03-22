import { getCaretPosition } from './helper';

const STAGE = {
    COLUMN: 0,
    FUNC: 1,
    OPERATOR: 2,
    GLUE: 3,
    VALUE: 4,
    MIX: 5,
};

const TYPE_INPUT = {
    ALERT: '0',
    IR_FLOW: '1',
    EVENT: '2',
    AGENT: '3',
};

export class StructureDetectionService {
    constructor(_columns, _values, _operators, _glues) {
        this.stagesMap = null;
        this.last_col = '';
        this.last_val = '';
        this.found = false;
        this.isFinishWord = false;

        this.columns = _columns || [];
        this.vals = _values || [];
        this.operators = _operators || [];
        this.glues = _glues || [];
    }

    async recommendFromHistory(history, type, callback) {
        let recommendData = [];
        this.stagesMap = null;

        if (history === '' || history === undefined) {
            this.find(this.columns, recommendData);
            callback(recommendData, 0, null, null);
            return;
        }

        this.detectLabel(history);
        let nextStage = this.next();

        switch (nextStage) {
            case (STAGE.MIX, STAGE.COLUMN):
                this.find(this.columns, recommendData);
                callback(recommendData, nextStage, null, null);
                break;
            case STAGE.VALUE:
                await this.getRecommendData(this.last_col, type, (data) => {
                    this.find(data, recommendData);
                    callback(recommendData, nextStage, null, null);
                });
                break;
            case STAGE.OPERATOR:
                this.find(this.operators, recommendData);
                callback(recommendData, nextStage, this.last_col, this.columns);
                break;
            case STAGE.GLUE:
                this.find(this.glues, recommendData);
                callback(recommendData, nextStage, null, null);
                break;
            default:
                // Nothing
                break;
        }
    }

    async fetchData(path) {
        // TODO: fetch data from server
        return ['test1', 'test2', 'test3', 'test4', 'test5', 'test6'];
    }

    async getRecommendData(last_col, type, callback) {
        let rs = [];

        let pathObj = {};
        pathObj[TYPE_INPUT.ALERT] = 'api/alert/get_data_suggest';
        pathObj[TYPE_INPUT.IR_FLOW] = 'api/ir_flow/get_data_suggest';
        pathObj[TYPE_INPUT.EVENT] = 'api/event/get_data_suggest';
        pathObj[TYPE_INPUT.AGENT] = 'api/agent/get_data_suggest';

        const path = pathObj[type.toString()];
        const data = await this.fetchData(path);

        data.forEach((itm) => {
            rs.push('"' + itm + '"');
        });
        this.vals = rs;
        callback(rs);
    }

    find(dataSource, result) {
        if (dataSource !== undefined) {
            for (let data of dataSource) {
                result.push(data);
            }
        }
    }

    checkExist(dataSource, item, type = 0) {
        let check = false;
        if (dataSource !== undefined) {
            dataSource.forEach((itm) => {
                if (type === 0) {
                    if (itm.toLowerCase() === item.toLowerCase()) check = true;
                } else if (type === 1) {
                    if (itm.key.toLowerCase() === item.toLowerCase()) check = true;
                }
            });
        }

        return check;
    }

    next() {
        if (this.stagesMap === STAGE.COLUMN) return STAGE.OPERATOR;
        if (this.stagesMap === STAGE.OPERATOR) return STAGE.VALUE;
        if (this.stagesMap === STAGE.VALUE) return STAGE.GLUE;
        if (this.stagesMap === STAGE.GLUE) return STAGE.COLUMN;
    }

    getLastCol(str) {
        let arrOperator = this.operators.map((itm) => str.lastIndexOf(itm.key));
        let lastOperatorIndex = Math.max(...arrOperator);
        if (lastOperatorIndex === -1) lastOperatorIndex = 1;
        return str[lastOperatorIndex - 1];
    }

    recursive(str, mirror, i) {
        for (let j = i - 1; j >= 0; j--) {
            if (this.found) break;

            let pre_word = str[j];
            mirror.push(pre_word);
            let ws = [...mirror].reverse().join(' ');
            if (this.checkExist(this.operators, pre_word, 1)) {
                if (this.isFinishWord) this.stagesMap = STAGE.VALUE;
                else {
                    this.stagesMap = STAGE.OPERATOR;
                    this.last_val = str[i];
                }
                this.found = true;
            } else if (this.checkExist(this.glues, pre_word, 1)) {
                this.stagesMap = STAGE.COLUMN;
                this.found = true;
            } else if (this.checkExist(this.vals[this.last_col], ws)) {
                this.stagesMap = STAGE.VALUE;
                this.found = true;
            } else if (this.checkExist(this.glues, pre_word, 1)) {
                this.stagesMap = STAGE.COLUMN;
                this.found = true;
            } else {
                this.recursive(str, mirror, j);
            }
        }
    }

    detectLabel(history) {
        this.found = false;
        let str = history;
        str = str.trim().split(/\s+/g);
        let mirror = [];
        if (str.length > 0) {
            this.last_col = this.getLastCol(str);
        } else {
            this.last_col = !!this.last_col ? this.last_col : this.columns[0];
        }

        for (let i = str.length - 1; i >= 0; i--) {
            let cur_word = str[i];
            mirror.push(cur_word);
            this.isFinishWord =
                getCaretPosition(document.getElementById('input-suggestion')) > history.lastIndexOf('"');

            if ((this.isFinishWord || str.length > 1) && this.checkExist(this.operators, cur_word, 1)) {
                this.stagesMap = STAGE.OPERATOR;
                this.last_col = str[i - 1];
                break;
            } else if ((this.isFinishWord || str.length > 1) && this.checkExist(this.glues, cur_word, 1)) {
                this.stagesMap = STAGE.GLUE;
                break;
            } else {
                if (str.length === 1 || this.checkExist(this.glues, str[i - 1], 1)) {
                    if (!(history.lastIndexOf(' ') === history.length - 1) || str[i] === '"') {
                        this.stagesMap = STAGE.GLUE;
                        break;
                    } else {
                        this.stagesMap = STAGE.COLUMN;
                        break;
                    }
                } else if (this.checkExist(this.vals[this.last_col], cur_word)) {
                    this.stagesMap = STAGE.VALUE;
                    this.last_val = str[i];
                    break;
                } else if (this.checkExist(this.vals[this.last_col], str[i - 1])) {
                    this.stagesMap = STAGE.VALUE;
                    this.last_val = str[i - 1];
                    break;
                } else {
                    this.recursive(str, mirror, i);
                    break;
                }
            }
        }
    }
}
