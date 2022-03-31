import { Fragment, useState, useEffect } from 'react';
import { Row, Col, Typography, Form, Button, Descriptions, Divider, Skeleton } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

import './styles.css';

const renderSkeleton = () => (
  <Fragment>
    <Descriptions.Item label='Logradouro'>
      <Skeleton.Input size='small' active />
    </Descriptions.Item>
    <Descriptions.Item label='Bairro'>
      <Skeleton.Input size='small' active />
    </Descriptions.Item>
    <Descriptions.Item label='Localidade'>
      <Skeleton.Input size='small' active />
    </Descriptions.Item>
    <Descriptions.Item label='UF'>
      <Skeleton.Input size='small' active />
    </Descriptions.Item>
    <Descriptions.Item label='DDD'>
      <Skeleton.Input size='small' active />
    </Descriptions.Item>
  </Fragment>
)

const CepData = ({ loading, cepNumber, cepData }) => {
  const currentCep = cepData[cepNumber];

  return (
    <Descriptions title={`CEP: ${cepNumber}`}>
      {loading && renderSkeleton()}
      {currentCep && (
        <Fragment>
            <Descriptions.Item label='Logradouro'>
              {currentCep.erro ? 'Não encontramos o logradouro deste CEP' : currentCep.logradouro}
            </Descriptions.Item>
            <Descriptions.Item label='Bairro'>
              {currentCep.erro ? 'Não encontramos o bairro deste CEP' : currentCep.bairro}
            </Descriptions.Item>
            <Descriptions.Item label='Localidade'>
              {currentCep.erro ? 'Não encontramos a localidade deste CEP' : currentCep.localidade}
            </Descriptions.Item>
            <Descriptions.Item label='UF'>
              {currentCep.erro ? 'Não encontramos a UF deste CEP' : currentCep.uf}
            </Descriptions.Item>
            <Descriptions.Item label='DDD'>
              {currentCep.erro ? 'Não encontramos o DDD deste CEP' : currentCep.ddd}
            </Descriptions.Item>
          </Fragment>
      )}
    </Descriptions>
  )
};

const Main = () => {
  const [cep, setCep] = useState('');
  const [cepList, setCepList] = useState([]);
  const [cepData, setCepData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async cep => {
      setLoading(true);
      const { status, data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setLoading(false);
      return { status, data }
    };
    
    if (cepList.length === 5) {
      cepList.forEach(cep => {
        fetchData(cep).then(({ status, data }) => {
          if (status === 200 && data) {
            const { cep: cepNumber, ...rest } = data;
            setCepData(prevState => ({...prevState, [cep]: { ...rest } }));
          }
        });
      });
    }
  }, [cepList]);
  
  const handleChange = (event) => {
    const { value } = event.target;
    setCep(value);
  };

  const handleClick = () => {
    setCepList(prevState => [...prevState, cep]);
    setCep('');
  };

  return (
    <div className='container'>
      <Row>
        <Col span={12} offset={6}>
          <Col>
            <Row justify='center'>
              <Typography.Title>Busca CEP</Typography.Title>
            </Row>
            <Row justify='center'>
              <Form layout='inline'>
                <Form.Item>
                  <MaskedInput
                    mask='00000-000'
                    value={cep}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={handleClick}
                    loading={loading}
                    type='primary'
                    disabled={cepList.length === 5}
                  >
                   {loading ? 'Buscando...' : 'Adicionar CEP na lista'}
                  </Button>
                </Form.Item>
              </Form>
            </Row>
          </Col>
          <Col>
            <Row justify='center'>
              {cepList?.map(cepNumber => (
                <Row key={cepNumber}>
                  <Divider />
                  <CepData loading={loading} cepNumber={cepNumber} cepData={cepData} />
                </Row>
              ))}
            </Row>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Main;
