import { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { API } from '../utils';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  const [name, setName] = useState("");
  const [salePoint, setSalePoint] = useState("");
  const [codCon, setCodCon] = useState('');
  const [configurationObj, setConfigurationObj] = useState({});
  
  const [configus, setConfigus] = useState([]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const getTodayInGMT3 = () => {
    const now = new Date();
    // Convertimos a la hora de Argentina (GMT-3)
    const offset = now.getTimezoneOffset(); // En minutos
    const localDate = new Date(now.getTime() - (offset + 180) * 60 * 1000); // 180 = 3 horas
    
    return localDate.toISOString().split("T")[0];
  };


  const filtro = {
    firstDat : getTodayInGMT3(),
    lastDat : getTodayInGMT3(),
    codCus : '',
    codSup : '',
    codPro : '',
    codEnc : '',
    codCom : '',
    codVal : '',
    codCon : '',
    codUse : '',
    nameCus : 'Todos',
    nameCon : 'Todos',
    nameUse : 'Todos',
    nameSup : 'Todos',
    desPro : 'Todos',
    nameCom : 'Todos',
    desVal : 'Todos',
    nameEnc : 'Todos',
    order : 'newest',
  };



  const [punto, setPunto] = useState(localStorage.getItem('punto'));

  // 1. Primero obtenemos configuración si no hay
  useEffect(() => {
    const fetchConfi = async () => {
      try {
        const { data } = await axios.get(`${API}/api/configurations/`);
        const conf = data[0];
        // localStorage.setItem('punto', conf._id);
        // localStorage.setItem('puntonum', conf.codCon);
        // localStorage.setItem('nameCon', conf.name);
        setPunto(conf._id); // <-- actualizamos el estado después de setItem
        setConfigurationObj(conf);
        setCodCon(conf._id);
        setName(conf.name);
        setSalePoint(conf.codCon);
        guardaLocal(conf);
      } catch (error) {
        console.error('Error al cargar configuración:', error);
      }
    };
    
    if (!punto) {
      fetchConfi();
    }
  }, [punto]);
  
  // 2. Cuando ya existe `punto`, hacemos el fetch de productos
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`${API}/api/products?configuracion=${punto}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    
    if (punto) {
      fetchData();
    }
  }, [punto]);

  const guardaLocal = (conf) => {
        localStorage.setItem('punto', conf._id);
        localStorage.setItem('puntonum', conf.codCon);
        localStorage.setItem('nameCon', conf.name);
    };


  return (
    <div>
      <Helmet>
        <title>Invoicer</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} xs={6} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
