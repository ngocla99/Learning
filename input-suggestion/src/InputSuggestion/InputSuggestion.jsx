import { Input } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { getCaretPosition, setCaretPosition } from './helper';
import { StructureDetectionService } from './StructureDetectionService';
import './styles.css';

const InputSuggestion = ({ placeholder, path, searchBy, category, numberField, columns, persist, trigger }) => {
    const inputRef = useRef('');
    const [searchText, setSearchText] = useState('');
    const [isHideHintSelect, setIsHideHintSelect] = useState(true);
    const [filterSelect, setFilterSelect] = useState([]);
    const [positionActive, setPositionActive] = useState(-1);
    const [indexDesReaded, setIndexDesReaded] = useState(-1);
    const [stage, setStage] = useState();

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [word, setWord] = useState('');
    const containerRef = useRef();

    const STAGE = {
        COLUMN: 0,
        FUNC: 1,
        OPERATOR: 2,
        GLUE: 3,
        VALUE: 4,
        MIX: 5,
    };

    const values = {};

    const glues = [
        { key: 'AND', desc: 'Requires all conditions to be satified.' },
        { key: 'OR', desc: 'Requires one or more conditions to be satified.' },
    ];

    const operations = [
        { key: '=', desc: 'Equal some values.' },
        { key: '!=', desc: 'Not equal some values.' },
        { key: '~', desc: 'Like some values.' },
        { key: '>', desc: 'Greater than some values.' },
        { key: '>=', desc: 'Greater than and equal some values.' },
        { key: '<', desc: 'Less than some values.' },
        { key: '<=', desc: 'Less than and equal some values.' },
    ];

    const beforehint = [];

    useEffect(() => {
        // TODO: Trigger by search button
    }, [trigger]);

    useEffect(() => {
        // TODO: persist search input when reload page
    }, []);

    useEffect(() => {
        if (isHideHintSelect) return;
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isHideHintSelect]);

    const handleClickOutside = (event) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target) &&
            inputRef.current &&
            !inputRef.current.contains(event.target)
        ) {
            setIsHideHintSelect(true);
            setPositionActive(-1);
        }
    };

    const complete = (position, search = searchText) => {
        setIndexDesReaded(-1);
        let string = search;
        string = string.replace(/[(|)]/g, '');

        if (position === 0) position = getCaretPosition(document.getElementById('input-suggestion'));

        const StructureDetectionFactory = new StructureDetectionService(columns, values, operations, glues);

        StructureDetectionFactory.recommendFromHistory(string, category, (recommendData, stage, lastCol, columns) => {
            let result = recommendData;
            let beforehint = result;
            let filterSelect;
            let positionActive;
            setStage(stage);
            if (!!lastCol) {
                let type = null;
                columns.forEach((itm) => {
                    if (itm.key === lastCol.trim()) type = itm.type;
                });

                if (type === 'number' || numberField.includes(lastCol.trim()))
                    beforehint = beforehint.filter((itm) => itm.key !== '~');
            }
            if (string.charAt(position - 1) === ' ') {
                if (result.length > 0) setIsHideHintSelect(false);
                setStart(position);
                setEnd(position + 1);

                if (stage !== STAGE.VALUE) {
                    filterSelect = beforehint.map((item) => ({
                        search_select: item,
                        stage: stage,
                    }));
                } else {
                    filterSelect = beforehint.map((item) => ({
                        search_select: { key: item, desc: '' },
                        stage: stage,
                    }));
                }
            } else {
                positionActive = -1;
                filterSelect = [];

                let word_temp = '';
                for (let i = position - 1; i >= 0; i--) {
                    if (['(', ',', ' '].indexOf(string.charAt(i)) !== -1) {
                        break;
                    } else {
                        word_temp += string.charAt(i);
                    }
                }

                let word = '';
                for (let i = word_temp.length - 1; i >= 0; i--) {
                    word += word_temp.charAt(i);
                }
                if (word === '""') word = '';
                setStart(position - word.length);
                setEnd(position);

                let stringSearch = word.toLowerCase().trim();
                let condition = 1;

                // check operator has typed
                setIsHideHintSelect(false);
                let output1 = [];
                let output = [];
                if (stage === STAGE.VALUE) {
                    beforehint.forEach((search_select) => {
                        let search_select_item = {};
                        if (stage != STAGE.VALUE) {
                            search_select_item = {
                                search_select: search_select,
                                stage: stage,
                            };
                        } else {
                            search_select_item = {
                                search_select: { key: search_select, desc: '' },
                                stage: stage,
                            };
                        }
                        output.push(search_select_item);
                    });
                    filterSelect = output.concat(output);
                } else {
                    beforehint.forEach((search_select) => {
                        let search_select_item = {};
                        if (stage != STAGE.VALUE) {
                            search_select_item = {
                                search_select: search_select,
                                stage: stage,
                            };
                        } else {
                            search_select_item = {
                                search_select: { key: search_select, desc: '' },
                                stage: stage,
                            };
                        }

                        if (stringSearch !== '' && stringSearch !== null) {
                            if (stage != STAGE.VALUE) {
                                if (search_select.key.toLowerCase().indexOf(stringSearch) >= 0 && condition) {
                                    if (search_select.key.toLowerCase().indexOf(stringSearch) === 0) {
                                        output1.push(search_select_item);
                                    } else {
                                        output.push(search_select_item);
                                    }
                                }
                            } else {
                                if (search_select.toLowerCase().indexOf(stringSearch) >= 0 && condition) {
                                    if (search_select.toLowerCase().indexOf(stringSearch) === 0) {
                                        output1.push(search_select_item);
                                    } else {
                                        output.push(search_select_item);
                                    }
                                }
                            }
                        } else {
                            output1.push(search_select_item);
                        }
                    });

                    if (output1.length + output.length > 0) {
                        setIsHideHintSelect(false);
                        if (!!stringSearch) {
                            output1.sort(function (a, b) {
                                let nameA = a.search_select.key.toUpperCase();
                                let nameB = b.search_select.key.toUpperCase();

                                if (nameA < nameB) return -1;
                                if (nameA > nameB) return 1;
                                return 0;
                            });

                            output.sort(function (a, b) {
                                let nameA = a.search_select.key.toUpperCase();
                                let nameB = b.search_select.key.toUpperCase();

                                if (nameA < nameB) return -1;
                                if (nameA > nameB) return 1;
                                return 0;
                            });
                        }
                    }
                }
                filterSelect = output1.concat(output);
            }
            setFilterSelect(filterSelect);
        });
    };

    const callback = () => {
        // hanlde search
        setIsHideHintSelect(true);
    };

    const fillTextbox = (obj) => {
        let oldString = searchText;
        let string = obj.search_select.key;
        let tmpStage = obj.stage;
        if (tmpStage === STAGE.VALUE) {
            oldString =
                oldString.substring(0, start + 1) +
                string.replace(/^"(.*)"$/, '$1') +
                oldString.substring(end, oldString.length);
        } else {
            oldString = oldString.substring(0, start) + string + oldString.substring(end, oldString.length);
        }

        let searchString;
        if (tmpStage === STAGE.OPERATOR) searchString = oldString + ' ""';
        else searchString = oldString + ' ';

        setPositionActive(-1);
        setSearchText(searchString);

        let position;
        if (tmpStage !== STAGE.OPERATOR) position = searchString.length;
        else position = searchString.length - 1;

        setTimeout(() => {
            setCaretPosition(document.getElementById('input-suggestion'), position);
            complete(position, searchString);
        }, 20);
    };

    const fillTextboxEnter = () => {
        let string = filterSelect[positionActive].search_select.key;
        let tmpStage = filterSelect[positionActive].stage;
        let oldString = searchText;
        if (tmpStage === STAGE.VALUE)
            oldString =
                oldString.substring(0, start + 1) +
                string.replace(/^"(.*)"$/, '$1') +
                oldString.substring(end, oldString.length);
        else oldString = oldString.substring(0, start) + string + oldString.substring(end, oldString.length);

        let searchString;
        if (tmpStage === STAGE.OPERATOR) searchString = oldString + ' ""';
        else searchString = oldString + ' ';
        setSearchText(searchString);
        setPositionActive(-1);

        let position;
        if (tmpStage !== STAGE.OPERATOR) position = searchString.length;
        else position = searchString.length - 1;

        setTimeout(() => {
            setCaretPosition(document.getElementById('input-suggestion'), position);
            complete(position, searchString);
        }, 20);
    };

    const preSelect = (element) => {
        let itemActive = positionActive;
        if (itemActive >= 1) {
            itemActive--;
            setTimeout(function () {
                const elementLi = element.nextElementSibling.querySelector('.active');
                const elementUl = elementLi.closest('ul.suggestions');
                const heuightEl = elementLi.getBoundingClientRect().height;
                const top = elementLi.getBoundingClientRect().top - elementUl.getBoundingClientRect().top;

                if (top <= 42) elementLi.closest('ul.suggestions').scrollTop = itemActive * heuightEl;
                if (top > 294) elementLi.closest('ul.suggestions').scrollTop = itemActive * heuightEl - itemActive;
            }, 50);
        } else {
            itemActive = filterSelect.length - 1;
        }

        setPositionActive(itemActive);
    };

    const nextSelect = (element) => {
        let itemActive = positionActive;
        if (filterSelect) {
            if (itemActive < filterSelect.length - 1) {
                itemActive++;
                setTimeout(function () {
                    const elementLi = element.nextElementSibling.querySelector('.active');
                    const elementUl = elementLi.closest('ul.suggestions');
                    const heuightEl = elementLi.getBoundingClientRect().height;
                    const top = elementLi.getBoundingClientRect().top - elementUl.getBoundingClientRect().top;

                    if (top != undefined) {
                        if (top >= 294) elementLi.closest('ul.suggestions').scrollTop = (itemActive - 6) * heuightEl;
                        if (top < 42)
                            elementLi.closest('ul.suggestions').scrollTop = itemActive * heuightEl - itemActive;
                    } else elementLi.closest('ul.suggestions').scrollTop = itemActive * heuightEl - itemActive - 8 * heuightEl;
                }, 50);
            } else {
                itemActive = 0;
            }
        }

        setPositionActive(itemActive);
    };

    const focusHandler = (e) => {
        const position = e.target.selectionStart;
        if (position === 0) {
            setTimeout(() => {
                complete(position);
            }, 0);
        }
    };

    const keyDownHandler = (event) => {
        const position = event.target.selectionStart;
        const element = document.getElementById('input-suggestion');

        switch (event.keyCode) {
            case 13: // enter
                if (positionActive !== -1) fillTextboxEnter();
                else callback();

                event.preventDefault();
                break;
            case 40: //down
                nextSelect(element);
                event.preventDefault();
                break;
            case 38: //up
                preSelect(element);
                event.preventDefault();
                break;
            case 32: //up
                if (event.shifKey) {
                    setTimeout(() => {
                        complete(position);
                    }, 200);
                }
                break;
            default:
                break;
        }
    };

    const keyUpHandler = (event) => {
        const position = event.target.selectionStart;
        let search = event.target.value;

        switch (event.keyCode) {
            case (13, 40, 38):
                break;
            case 222:
                if (search.charAt(position - 1) === '"') {
                    search = search + '"';
                    setSearchText(search);
                    setTimeout(() => {
                        setCaretPosition(document.getElementById('input-suggestion'), position);
                    }, 20);
                    setTimeout(() => {
                        complete(position);
                    }, 200);
                }
                break;
            default:
                setIsHideHintSelect(false);
                complete(position);
                event.preventDefault();
                break;
        }
    };

    const readDesDetail = () => {};

    return (
        <div>
            <input
                style={{ width: '100%' }}
                id='input-suggestion'
                type='text'
                ref={inputRef}
                value={searchText}
                autoComplete='off'
                placeholder={placeholder}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={keyDownHandler}
                onKeyUp={keyUpHandler}
                onFocus={focusHandler}
            />
            <div ref={containerRef} className='container-select'>
                {!isHideHintSelect && (
                    <ul className='suggestions'>
                        {filterSelect.map((el, idx) => (
                            <li
                                key={idx}
                                className={`suggestion__items ${idx === positionActive ? 'active' : ''}`}
                                onClick={fillTextbox.bind(null, el)}
                            >
                                {el.stage === 0 && (
                                    <div className='suggestion_items-icon field-icon'>
                                        <span className='icon-field'></span>
                                    </div>
                                )}
                                {el.stage === 2 && (
                                    <div className='suggestion_items-icon operator-icon'>
                                        <span className='icon-operator'></span>
                                    </div>
                                )}
                                {el.stage === 3 && (
                                    <div className='suggestion_items-icon condition-icon'>
                                        <span className='icon-condition'></span>
                                    </div>
                                )}
                                {el.stage === 0 && (
                                    <div className='suggestion_items-icon value-icon'>
                                        <span className='icon-value'></span>
                                    </div>
                                )}

                                <div className='suggestion__items-label'>{el.search_select.key}</div>
                                <div className='suggestion__items-desc'>{el.search_select.desc}</div>
                                <div className='suggestion__items-desc-select' onClick={(e) => readDesDetail(e, idx)}>
                                    <i ng-class="{'reading-more': indexDesReaded === $index, 'read-more': indexDesReaded !== $index}"></i>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {!isHideHintSelect && indexDesReaded > -1 && (
                    <div className='desc-detail'>{filterSelect[indexDesReaded].search_select.desc}</div>
                )}
            </div>
        </div>
    );
};

export default InputSuggestion;
