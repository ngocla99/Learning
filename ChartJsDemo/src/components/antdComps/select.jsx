import { Select } from 'antd';

const AntdSelect = () => {
  return (
    <>
      <Select mode='tags' allowClear style={{ width: '100%' }} placeholder='Please select' maxTagTextLength={10} />
    </>
  );
};

export default AntdSelect;
