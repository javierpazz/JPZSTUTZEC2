import { useContext, useState, useEffect, useReducer } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BiFileFind } from "react-icons/bi";
import { Store } from '../../../Store';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../../../components/LoadingBox';
import { getError, API } from '../../../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

        case 'SUPPLIER_FETCH_REQUEST':
            return { ...state, loading: true };
          case 'SUPPLIER_FETCH_SUCCESS':
            return {
              ...state,
              products: action.payload.products,
              page: action.payload.page,
              pages: action.payload.pages,
              loading: false,
            };
          case 'SUPPLIER_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
      

        /////////////
    case 'VALUE_FETCH_REQUEST':
      return { ...state, loadingVal: true };
    case 'VALUE_FETCH_SUCCESS':
      return {
        ...state,
        values: action.payload.values,
        pageVal: action.payload.page,
        pagesVal: action.payload.pages,
        loadingVal: false,
      };
    case 'VALUE_FETCH_FAIL':
      return { ...state, loadingVal: false, error: action.payload };
    default:
      return state;
  }
};

function AppFiltro() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';


const [
    {
      loading,
      error,
      products,
      pages,
      loadingVal,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    loadingVal: true,
    error: '',
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;


  const [codConNum, setCodConNum] = useState(userInfo.configurationObj.codCon);
  const [id_config, setId_config] = useState(userInfo.codCon);
  const [showCus, setShowCus] = useState(false);
  const [showCom, setShowCom] = useState(false);
  const [showSup, setShowSup] = useState(false);
  const [showPro, setShowPro] = useState(false);
  const [showEnc, setShowEnc] = useState(false);
  const [showUse, setShowUse] = useState(false);
  const [showCon, setShowCon] = useState(false);

  // const [codUse, setomdUse] = useState('');
  const [codCus, setCodCus] = useState('');
  const [codCust, setCodCust] = useState('');
  const [codCom, setCodCom] = useState('');
  const [codComp, setCodComp] = useState();
  const [nameCom, setNameCom] = useState('');
  const [name, setName] = useState('');
  const [custObj, setCustObj] = useState({});
  const [suppObj, setSuppObj] = useState({});
  const [codSup, setCodSup] = useState('');
  const [codSupp, setCodSupp] = useState('');
  const [nameSup, setNameSup] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [productR, setProductR] = useState({});
  const [codProd, setCodProd] = useState('');
  const [codPro, setCodPro] = useState('');
  const [desPro, setDesPro] = useState('');
  const [productss, setProductss] = useState([]);
  const [encargados, setEncargados] = useState([]);
  const [codEnc, setCodEnc] = useState('');
  const [codEncp, setCodEncp] = useState('');
  const [nameEnc, setNameEnc] = useState('');
  const [users, setUsers] = useState([]);
  const [codUse, setCodUse] = useState('');
  const [codUsep, setCodUsep] = useState('');
  const [nameUse, setNameUse] = useState('');
  const [configurations, setConfigurations] = useState([]);
  const [codCon, setCodCon] = useState('');
  const [codConp, setCodConp] = useState('');
  const [nameCon, setNameCon] = useState('');
  const [showVal, setShowVal] = useState(false);
  const [codValo, setCodValo] = useState('');
  const [codVal, setCodVal] = useState('');
  const [desVal, setDesVal] = useState('');
  const [valuees, setValuees] = useState([]);
  const [valueeR, setValueeR] = useState({});
  
  const today = new Date().toISOString().split("T")[0];
  const [firstDat, setFirstDat] = useState(today);
  const [lastDat, setLastDat] = useState(today);
  const [order, setOrder] = useState('newest');
  const [informe, setInforme] = useState('/admin/invoicesCajIngEgr');

  // const [userss, setUserss] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [valuess, setValuess] = useState([]);
  const [comprobantes, setComprobantes] = useState([]);
  const [width] = useState(641);
  const [showInvoice, setShowInvoice] = useState(false);

  const [isPaying, setIsPaying] = useState(false);
  const getTodayInGMT3 = () => {
    const now = new Date();
    // Convertimos a la hora de Argentina (GMT-3)
    const offset = now.getTimezoneOffset(); // En minutos
    const localDate = new Date(now.getTime() - (offset + 180) * 60 * 1000); // 180 = 3 horas
    
    return localDate.toISOString().split("T")[0];
  };


  const filtroCero = {
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



  const filtro = {
    firstDat : firstDat,
    lastDat : lastDat,
    codCus : codCus,
    codSup : codSup,
    codPro : codPro,
    codEnc : codEnc,
    codCom : codCom,
    codVal : codVal,
    codCon : codCon,
    codUse : codUse,
    order : order,
  };

    const getFilterUrl = (filter) => {
      const sortOrder = filter.order || order;
   };
  
  useEffect(() => {
    if (userInfo.filtro) { 
      // setName('Elija Cliente');
      // setNameEnc('Elija Encargado');
      // setDesPro('Elija un Producto');
      // setNameSup('Elija Proovedor');
      // setNameCom('Elija Documento');
      setFirstDat(userInfo.filtro.firstDat);
      setLastDat(userInfo.filtro.lastDat);
      setCodCus(userInfo.filtro.codCus);
      setName(userInfo.filtro.nameCus);
      setCodPro(userInfo.filtro.codPro);
      setDesPro(userInfo.filtro.desPro);
      setCodSup(userInfo.filtro.codSup);
      setNameSup(userInfo.filtro.nameSup);
      setCodCom(userInfo.filtro.codCom);
      setNameCom(userInfo.filtro.nameCom);
      setCodEnc(userInfo.filtro.codEnc);
      setNameEnc(userInfo.filtro.nameEnc);
      setCodUse(userInfo.filtro.codUse);
      setNameUse(userInfo.filtro.nameUse);
      setCodCon(userInfo.filtro.codCon);  
      setNameCon(userInfo.filtro.nameCon);
      setCodVal(userInfo.filtro.codVal);
      setDesVal(userInfo.filtro.desVal);
      setOrder(userInfo.filtro.order);
    }else{
      setFirstDat('Todos');
      setLastDat('Todos');
      // setCodCus('Todos');
      setName('Todos');
      // setCodPro('Todos');
      setDesPro('Todos');
      // setCodSup('Todos');
      setNameSup('Todos');
      // setCodCom('Todos');
      setNameCom('Todos');
      // setCodEnc('Todos');
      setNameEnc('Todos');
      // setCodUse('Todos');
      setNameUse('Todos');
      // setCodCon('Todos');
      setNameCon('Todos');
      setDesVal('Todos');
      setOrder('newest');
    }
    ;
}, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${API}/api/valuees/`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setValuees(data);
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {}
  };
  fetchData();
}, []);


useEffect(() => {
  const fetchDataVal = async () => {
    try {
      const { data } = await axios.get(`${API}/api/configurations/`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setConfigurations(data);
      dispatch({ type: 'SUPPLIER_FETCH_SUCCESS', payload: data });
    } catch (err) {}
  };
  fetchDataVal();
}, []);


useEffect(() => {
    const fetchDataVal = async () => {
      try {
        const { data } = await axios.get(`${API}/api/users/`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setUsers(data);
        dispatch({ type: 'SUPPLIER_FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };
    fetchDataVal();
  }, []);


  useEffect(() => {
    const fetchDataVal = async () => {
      try {
        const { data } = await axios.get(`${API}/api/encargados/`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setEncargados(data);
        dispatch({ type: 'SUPPLIER_FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };
    fetchDataVal();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API}/api/products/xpv?id_config=${id_config}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setProductss(data);
        dispatch({ type: 'SUPPLIER_FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataVal = async () => {
      try {
        const { data } = await axios.get(`${API}/api/suppliers/`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setSuppliers(data);
        dispatch({ type: 'SUPPLIER_FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };
    fetchDataVal();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API}/api/customers/`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setCustomers(data);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataVal = async () => {
      try {
        const { data } = await axios.get(`${API}/api/valuees/`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setValuess(data);
        dispatch({ type: 'VALUE_FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };
    fetchDataVal();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API}/api/comprobantes?id_config=${id_config}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setComprobantes(data);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (window.innerWidth < width) {
      alert('Place your phone in landscape mode for the best experience');
    }
  }, [width]);


  const submitHandlerVal = async (e) => {
    e.preventDefault();
    setShowVal(false)
  };


  const searchValuee = (codVal) => {
    const valueeR = valuees.find((row) => row._id === codVal);
    setValueeR(valueeR);
    setCodVal(valueeR._id);
    setCodValo(valueeR.codVal);
    setDesVal(valueeR.desVal);
  };

  const ayudaVal = (e) => {
    e.key === "Enter" && buscarPorCodVal(codValo);
    e.key === "F2" && handleShowVal(codVal);
    e.key === "Tab" && buscarPorCodVal(codValo);
  };
  

  const buscarPorCodVal = (codValo) => {
    const valueeR = valuees.find((row) => row.codVal === codValo);

    if (!valueeR) {
        setValueeR({});
        setCodVal('');
        setCodValo('');
        setDesVal('Todos');
      }else{
        setValueeR(valueeR);
        setCodVal(valueeR._id);
        setCodValo(valueeR.codValo);
        setDesVal(valueeR.desVal);
    };
  };



  const handleChangeVal = (e) => {
    searchValuee(e.target.value);
  };
  const handleShowVal = () => {
    setShowVal(true);
  };


  ////////////////////////////

  const submitHandlerCon = async (e) => {
    e.preventDefault();
    setShowCon(false)
  };
  
    const handleChangeCon = (e) => {
      searchCon(e.target.value);
    };
  
    const handleshowCon = () => {
        setShowCon(true);
      };
    
    
      const searchCon = (codCon) => {
        const configurationRow = configurations.find((row) => row._id === codCon);
        setCodCon(configurationRow._id);
        setCodConp(configurationRow.codCon);
        setNameCon(configurationRow.name);
      };
    
    
      const ayudaCon = (e) => {
        e.key === "Enter" && buscarPorcodCon(codConp);
        e.key === "F2" && handleshowCon(codCon);
        e.key === "Tab" && buscarPorcodCon(codConp);
      };
      
    
      const buscarPorcodCon = (codConp) => {
        const configurationRow = configurations.find((row) => row.codCon === codConp);
        if (!configurationRow) {
            setCodCon('');
            setCodConp('');
            setNameCon('Todos');
        }else{
          setCodCon(configurationRow._id);
          setCodConp(configurationRow.codCon);
          setNameCon(configurationRow.name);
          };
      };
    

  const submitHandlerUse = async (e) => {
    e.preventDefault();
    setShowUse(false)
  };
  
    const handleChangeUse = (e) => {
      searchUse(e.target.value);
    };
  
    const handleShowUse = () => {
        setShowUse(true);
      };
    
    
      const searchUse = (codUse) => {
        const userRow = users.find((row) => row._id === codUse);
        setCodUse(userRow._id);
        setCodUsep(userRow.codUse);
        setNameUse(userRow.name);
      };
    
    
      const ayudaUse = (e) => {
        e.key === "Enter" && buscarPorCodUse(codUsep);
        e.key === "F2" && handleShowUse(codUse);
        e.key === "Tab" && buscarPorCodUse(codUsep);
      };
      
    
      const buscarPorCodUse = (codUsep) => {
        const userRow = users.find((row) => row.codUse === codUsep);
        if (!userRow) {
            setCodUse('');
            setCodUsep('');
            setNameUse('Todos');
        }else{
          setCodUse(userRow._id);
          setCodUsep(userRow.codUse);
          setNameUse(userRow.name);
          };
      };
    
    

  const submitHandlerEnc = async (e) => {
    e.preventDefault();
    setShowEnc(false)
  };
  
    const handleChangeEnc = (e) => {
      searchEnc(e.target.value);
    };
  
    const handleShowEnc = () => {
        setShowEnc(true);
      };
    
    
      const searchEnc = (codEnc) => {
        const encargadoRow = encargados.find((row) => row._id === codEnc);
        setCodEnc(encargadoRow._id);
        setCodEncp(encargadoRow.codEnc);
        setNameEnc(encargadoRow.name);
      };
    
    
      const ayudaEnc = (e) => {
        e.key === "Enter" && buscarPorCodEnc(codEncp);
        e.key === "F2" && handleShowEnc(codEnc);
        e.key === "Tab" && buscarPorCodEnc(codEncp);
      };
      
    
      const buscarPorCodEnc = (codEncp) => {
        const encargadoRow = encargados.find((row) => row.codEnc === codEncp);
        if (!encargadoRow) {
            setCodEnc('');
            setCodEncp('');
            setNameEnc('Todos');
        }else{
          setCodEnc(encargadoRow._id);
          setCodEncp(encargadoRow.codEnc);
          setNameEnc(encargadoRow.name);
          };
      };
    
    



  const handleShowPro = () => {
    setShowPro(true);
  };

  const handleChangePro = (e) => {
    searchProduct(e.target.value);
  };


  const submitHandlerPro = async (e) => {
    e.preventDefault();
    setShowPro(false)
  };


  const searchProduct = (codPro) => {
    const productRow = productss.find((row) => row._id === codPro);
    setProductR(productRow);
    setCodPro(productRow._id);
    setCodProd(productRow.codPro);
    setDesPro(productRow.title);
  };


  const ayudaPro = (e) => {
    e.key === "Enter" && buscarPorCodPro(codProd);
    e.key === "F2" && handleShowPro(codPro);
    e.key === "Tab" && buscarPorCodPro(codProd);
  };
  

  const buscarPorCodPro = (codProd) => {
    const productRow = productss.find((row) => row.codPro === codProd);

    if (!productRow) {
        setCodPro('');
        setCodProd('');
        setDesPro('Todos');
        setProductR({});
      }else{
        setProductR(productRow);
        setCodPro(productRow._id);
        setCodProd(productRow.codProd);
        setDesPro(productRow.title);
    };
  };

  const handleShowSup = () => {
    setShowSup(true);
  };

  const submitHandlerSup = async (e) => {
    e.preventDefault();
    setShowSup(false)
  };

  const handleChangeSup = (e) => {
    searchSup(e.target.value);
  };


  const searchSup = (codSup) => {
    const supplierRow = suppliers.find((row) => row._id === codSup);
    setSuppObj(supplierRow);
    setCodSup(supplierRow._id);
    setCodSupp(supplierRow.codSup);
    setNameSup(supplierRow.name);
  };


  const ayudaSup = (e) => {
    e.key === "Enter" && buscarPorCodSup(codSupp);
    e.key === "F2" && handleShowSup(codSup);
    e.key === "Tab" && buscarPorCodSup(codSupp);
  };
  

  const buscarPorCodSup = (codSupp) => {
    const supplierRow = suppliers.find((row) => row.codSup === codSupp);
    if (!supplierRow) {
        setCodSup('');
        setCodSupp('');
        setNameSup('Todos');
    }else{
      setCodSup(supplierRow._id);
      setCodSupp(supplierRow.codSup);
      setNameSup(supplierRow.name);
      };
  };



  const handleShowCom = () => {
    setShowCom(true);
  };

  const handleShowCus = () => {
    setShowCus(true);
  };


  const searchCus = (codCus) => {
    const usersRow = customers.find((row) => row._id === codCus);
    setCustObj(usersRow);
    setCodCus(usersRow._id);
    setCodCust(usersRow.codCus);
    setName(usersRow.nameCus);
  };

  
  const ayudaCus = (e) => {
    e.key === "Enter" && buscarPorCodCus(codCust);
    e.key === "F2" && handleShowCus(codCus);
    e.key === "Tab" && buscarPorCodCus(codCust);
  };
  

  const buscarPorCodCus = (codCust) => {
    const usersRow = customers.find((row) => row.codCus === codCust);
    if (!usersRow) {
        setCustObj({});
        setCodCus('');
        setCodCust('');
        setName('Todos');
    }else{
      setCodCus(usersRow._id);
      setCodCust(usersRow.codCus);
      setCustObj(usersRow);
      setName(usersRow.nameCus);
      };
  };


  const handleChangeCus = (e) => {
    searchCus(e.target.value);
  };

  const submitHandlerCom = async (e) => {
    e.preventDefault();
    setShowCom(false)
  };
  const submitHandlerCus = async (e) => {
    e.preventDefault();
    setShowCus(false)
  };

  const handleChangeCom = (e) => {
    searchComprobante(e.target.value);
  };
  
  const searchComprobante = (codComp) => {
    const comprobantesRow = comprobantes.find((row) => row._id === codComp);
    setCodCom(comprobantesRow._id);
    setCodComp(comprobantesRow.codCom);
    setNameCom(comprobantesRow.nameCom);
    setNoDisc(comprobantesRow.noDisc);
    setToDisc(comprobantesRow.toDisc);
    setItDisc(comprobantesRow.itDisc);
  };

  const ayudaCom = (e) => {
    e.key === "Enter" && buscarPorCodCom(codComp);
    e.key === "F2" && handleShowCom(codCom);
    e.key === "Tab" && buscarPorCodCom(codComp);
  };
  

  const buscarPorCodCom = (codComp) => {
    const comprobantesRow = comprobantes.find((row) => row.codCom === codComp);
    if (!comprobantesRow) {
        setCodCom('');
        setCodComp('');
        setNameCom('Todos');
    }else{
      setCodCom(comprobantesRow._id);
      setCodComp(comprobantesRow.codCom);
      setNameCom(comprobantesRow.nameCom);
      setNoDisc(comprobantesRow.noDisc);
      setToDisc(comprobantesRow.toDisc);
      setItDisc(comprobantesRow.itDisc);

    };
  };


  const placeCancelaFiltro = async () => {
    navigate(redirect);
  };
  const placeLimpiaFiltro = async () => {
    if (window.confirm('Esta seguro de Grabar Parametros?')) {
      userInfo.filtro = filtroCero;
      userInfo.filtro.codCon = userInfo.codCon;
      userInfo.filtro.nameCon = userInfo.nameCon;

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    navigate(redirect);
    };
  };

  const placeInvoiceHandler = async () => {
    if (window.confirm('Esta seguro de Grabar Parametros?')) {
      filtro.firstDat = firstDat;
      filtro.lastDat = lastDat;
      filtro.codCus = codCus;
      filtro.nameCus = name;
      filtro.codPro = codPro;
      filtro.desPro = desPro;
      filtro.codSup = codSup;
      filtro.nameSup = nameSup;
      filtro.codCom = codCom;
      filtro.nameCom = nameCom;
      filtro.codEnc = codEnc;
      filtro.nameEnc = nameEnc;
      filtro.codUse = codUse;
      filtro.nameUse = nameUse;
      filtro.codCon = codCon;
      filtro.nameCon = nameCon;
      filtro.order = order;

        userInfo.filtro = filtro
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        navigate(redirect);
    };  
  };

  const parametros = async () => {
    if (window.confirm('Esta seguro de Generar el Informe?')) {
      filtro.firstDat = firstDat;
      filtro.lastDat = lastDat;
      filtro.codCus = codCus;
      filtro.nameCus = name;
      filtro.codPro = codPro;
      filtro.desPro = desPro;
      filtro.codSup = codSup;
      filtro.nameSup = nameSup;
      filtro.codCom = codCom;
      filtro.nameCom = nameCom;
      filtro.codEnc = codEnc;
      filtro.nameEnc = nameEnc;
      filtro.codUse = codUse;
      filtro.nameUse = nameUse;
      filtro.codCon = codCon;
      filtro.nameCon = nameCon;
      filtro.order = order;

        userInfo.filtro = filtro
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        navigate(informe);
    };  

  };


  return (
    <>
      <Helmet>
        <title>Informes y Filtros</title>
      </Helmet>

      <main>
        {!showInvoice ? (
          <>
            {/* name, address, email, phone, bank name, bank account number, website client name, client address, invoice number, Fecha Factura, Fecha Vencimiento, notes */}
            <div>
              <div className="bordeTable">


              <Row>
                  <Col md={4}>
                    <Card.Body>
                      <Card.Title>
                      <ListGroup.Item>
                            <h3>
                              
                            </h3>
                          </ListGroup.Item>

                      </Card.Title>
                    </Card.Body>
                  </Col>

                  <Col md={8} className="mt-1 text-black py-1 px-1 rounded ">
                      <Card.Body>
                        <Card.Title>
                          <ListGroup.Item>
                            <h3>
                              INFORMES Y FILTROS
                            </h3>
                          </ListGroup.Item>
                        </Card.Title>
                      </Card.Body>
                    </Col>


                </Row>


              <Row>

                <Col md={2}>
                <Card.Body>
                    <Card.Title>
                    <Form.Group className="input" controlId="name">
                        <Form.Label>Desde Fecha</Form.Label>
                        <Form.Control
                        className="input"
                        type="date"
                        placeholder="Desde Fecha"
                        value={firstDat}
                        onChange={(e) => setFirstDat(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter"}
                        // required
                        />
                    </Form.Group>
                    </Card.Title>
                </Card.Body>
                </Col>

                <Col md={2}>
                <Card.Body>
                    <Card.Title>
                    <Form.Group className="input" controlId="name">
                        <Form.Label>Hasta Fecha</Form.Label>
                        <Form.Control
                        className="input"
                        type="date"
                        placeholder="Hasta Fecha"
                        value={lastDat}
                        onChange={(e) => setLastDat(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter"}
                        // required
                        />
                    </Form.Group>
                    </Card.Title>
                </Card.Body>
                </Col>
                <Col md={2}>
                  <Card.Body>
                        <Card.Title>
                          <Form.Group className="input" controlId="name">
                            Ordenado por{' '}
                            <select
                              className="input"
                              value={order}
                              onChange={(e) => setOrder(e.target.value)}
                              >
                              <option value="newest">Fecha Des </option>
                              <option value="oldest">Fecha Asc</option>
                              <option value="mayimporte">Importe Des </option>
                              <option value="menimporte">Importe Asc </option>

                            </select>
                          </Form.Group>
                      </Card.Title>
                  </Card.Body>
                </Col>
                <Col md={4}>
                  <Card.Body>
                        <Card.Title>
                          <Form.Group className="input" controlId="name">
                            Elija Informe a generar
                            <select
                              className="input"
                              value={informe}
                              onChange={(e) => setInforme(e.target.value)}
                              >
                              <option value="/admin/invoicesCajIngEgr">Caja</option>
                              <option value="/admin/informe/IngEgr">Caja Control Ingresos y Retiros Por Encargado</option>
                              <option value="/admin/informe/ctacus">Cta Cte Clientes</option>
                              <option value="/admin/informe/ctasup">Cta Cte Proovedores</option>
                              <option value="/admin/informe/cuspro">Clientes - Productos Vendidos</option>
                              <option value="/admin/informe/suppro">Proovedores - Productos Comprados</option>
                              <option value="/admin/informe/procus">Productos - Clientes a los que Vendimos</option>
                              <option value="/admin/informe/prosup">Productos - Proovedores a los que Compramos</option>
                              <option value="/admin/informe/proiye">Productos Ingresos / Egresos</option>
                              <option value="/admin/informe/proiye">Productos Lista de Precios</option>
                              <option value="/admin/informe/proiye">Productos con Stock Minimo</option>

                            </select>
                          </Form.Group>
                      </Card.Title>
                  </Card.Body>
                </Col>
                <Col className="col text-end">
          <div>
            <Button type="button"
                    variant="primary"
                    onClick={parametros}
                  >
              Genera Informe
            </Button>
            </div>
        </Col>


                </Row>

                <Row>
                  <Col md={2}>
                    <Card.Body>
                      <Card.Title>
                        <Form.Group className="input" controlId="name">
                          <Form.Label>Codigo Pto Venta</Form.Label>
                          <Form.Control
                            className="input"
                            placeholder="Codigo Pto Venta"
                            value={codConp}
                            onChange={(e) => setCodConp(e.target.value)}
                            // onKeyDown={(e) => e.key === "Enter" && buscarPorcodCon(codConp)}
                            onKeyDown={(e) => ayudaCon(e)}
                            // buscarPorcodCon
                          />
                        </Form.Group>
                      </Card.Title>
                    </Card.Body>
                  </Col>
                  <Col md={1}>
                    <Button
                      className="mt-3 mb-1 bg-yellow-300 text-black py-1 px-1 rounded shadow border-2 border-yellow-300 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                      type="button"
                      title="Buscador"
                      onClick={() => handleshowCon()}
                      >
                      <BiFileFind className="text-blue-500 font-bold text-xl" />
                    </Button>
                  </Col>

                  <Col md={3} className="mt-1 text-black py-1 px-1 rounded ">
                      <Card.Body>
                        <Card.Title>
                          <ListGroup.Item>
                            <h3>
                              {nameCon}
                            </h3>
                          </ListGroup.Item>
                        </Card.Title>
                      </Card.Body>
                    </Col>

                  <Col md={2}>
                    <Card.Body>
                      <Card.Title>
                        <Form.Group className="input" controlId="name">
                          <Form.Label>Codigo de Usuario</Form.Label>
                          <Form.Control
                            className="input"
                            placeholder="Codigo Usuario"
                            value={codUsep}
                            onChange={(e) => setCodUsep(e.target.value)}
                            // onKeyDown={(e) => e.key === "Enter" && buscarPorCodUse(codUsep)}
                            onKeyDown={(e) => ayudaUse(e)}
                            disabled={true}
                            // buscarPorCodUse
                            />
                        </Form.Group>
                      </Card.Title>
                    </Card.Body>
                  </Col>
                  <Col md={1}>
                    <Button
                      className="mt-3 mb-1 bg-yellow-300 text-black py-1 px-1 rounded shadow border-2 border-yellow-300 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                      type="button"
                      title="Buscador"
                      onClick={() => handleShowUse()}
                      >
                      <BiFileFind className="text-blue-500 font-bold text-xl" />
                    </Button>
                  </Col>

                  <Col md={3} className="mt-1 text-black py-1 px-1 rounded ">
                      <Card.Body>
                        <Card.Title>
                          <ListGroup.Item>
                            <h3>
                              {nameUse}
                            </h3>
                          </ListGroup.Item>
                        </Card.Title>
                      </Card.Body>
                    </Col>
                </Row>


                <Row>
                  <Col md={2}>
                    <Card.Body>
                      <Card.Title>
                        <Form.Group className="input" controlId="name">
                          <Form.Label>Codigo Comprobante</Form.Label>
                          <Form.Control
                            className="input"
                            placeholder="Codigo Comprobante"
                            value={codComp}
                            onChange={(e) => setCodComp(e.target.value)}
                            // onKeyDown={(e) => e.key === "Enter" && buscarPorCodCom(codComp)}
                            onKeyDown={(e) => ayudaCom(e)}
                            // required
                          />
                        </Form.Group>
                      </Card.Title>
                    </Card.Body>
                  </Col>
                  <Col md={1}>
                    <Button
                      className="mt-3 mb-1 bg-yellow-300 text-black py-1 px-1 rounded shadow border-2 border-yellow-300 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                      type="button"
                      title="Buscador"
                      onClick={() => handleShowCom()}
                      >
                      <BiFileFind className="text-blue-500 font-bold text-xl" />
                    </Button>
                  </Col>

                  <Col md={3} className="mt-1 text-black py-1 px-1 rounded ">
                      <Card.Body>
                        <Card.Title>
                          <ListGroup.Item>
                            <h3>
                              {nameCom}
                            </h3>
                          </ListGroup.Item>
                        </Card.Title>
                      </Card.Body>
                    </Col>

                  <Col md={2}>
                    <Card.Body>
                      <Card.Title>
                        <Form.Group className="input" controlId="name">
                          <Form.Label>Codigo Cliente</Form.Label>
                          <Form.Control
                            className="input"
                            placeholder="Codigo Cliente"
                            value={codCust}
                            onChange={(e) => setCodCust(e.target.value)}
                            // onKeyDown={(e) => e.key === "Enter" && buscarPorCodCus(codCust)}
                            onKeyDown={(e) => ayudaCus(e)}
                            // required
                            />
                        </Form.Group>
                      </Card.Title>
                    </Card.Body>
                  </Col>
                  <Col md={1}>
                    <Button
                      className="mt-3 mb-1 bg-yellow-300 text-black py-1 px-1 rounded shadow border-2 border-yellow-300 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                      type="button"
                      title="Buscador"
                      onClick={() => handleShowCus()}
                      >
                      <BiFileFind className="text-blue-500 font-bold text-xl" />
                    </Button>
                  </Col>

                  <Col md={3} className="mt-1 text-black py-1 px-1 rounded ">
                      <Card.Body>
                        <Card.Title>
                          <ListGroup.Item>
                            <h3>
                              {name}
                            </h3>
                          </ListGroup.Item>
                        </Card.Title>
                      </Card.Body>
                    </Col>

                </Row>

                <Row>
                  <Col md={2}>
                    <Card.Body>
                      <Card.Title>
                        <Form.Group className="input" controlId="name">
                          <Form.Label>Codigo Proovedor</Form.Label>
                          <Form.Control
                            className="input"
                            placeholder="Codigo Proovedor"
                            value={codSupp}
                            onChange={(e) => setCodSupp(e.target.value)}
                            // onKeyDown={(e) => e.key === "Enter" && buscarPorCodSup(codSupp)}
                            onKeyDown={(e) => ayudaSup(e)}
                            // buscarPorCodSup
                          />
                        </Form.Group>
                      </Card.Title>
                    </Card.Body>
                  </Col>
                  <Col md={1}>
                    <Button
                      className="mt-3 mb-1 bg-yellow-300 text-black py-1 px-1 rounded shadow border-2 border-yellow-300 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                      type="button"
                      title="Buscador"
                      onClick={() => handleShowSup()}
                      >
                      <BiFileFind className="text-blue-500 font-bold text-xl" />
                    </Button>
                  </Col>

                  <Col md={3} className="mt-1 text-black py-1 px-1 rounded ">
                      <Card.Body>
                        <Card.Title>
                          <ListGroup.Item>
                            <h3>
                              {nameSup}
                            </h3>
                          </ListGroup.Item>
                        </Card.Title>
                      </Card.Body>
                    </Col>

            <Col md={2}>
              <Card.Body>
                <Card.Title>
                  <Form.Group className="input" controlId="name">
                    <Form.Label>Codigo Producto</Form.Label>
                    <Form.Control
                      className="input"
                      placeholder="Codigo Producto"
                      value={codProd}
                      onChange={(e) => setCodProd(e.target.value)}
                      // onKeyDown={(e) => e.key === "Enter" && buscarPorCodPro(codProd)}
                      onKeyDown={(e) => ayudaPro(e)}
                      disabled={isPaying}
                      // required
                    />
                  </Form.Group>
                </Card.Title>
              </Card.Body>
            </Col>
                  <Col md={1}>
                    <Button
                      className="mt-3 mb-1 bg-yellow-300 text-black py-1 px-1 rounded shadow border-2 border-yellow-300 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                      type="button"
                      title="Buscador"
                      onClick={() => handleShowPro()}
                      >
                      <BiFileFind className="text-blue-500 font-bold text-xl" />
                    </Button>
                  </Col>

                  <Col md={3} className="mt-1 text-black py-1 px-1 rounded ">
                      <Card.Body>
                        <Card.Title>
                          <ListGroup.Item>
                            <h3>
                              {desPro}
                            </h3>
                          </ListGroup.Item>
                        </Card.Title>
                      </Card.Body>
                    </Col>
                </Row>

                <Row>
                  <Col md={2}>
                    <Card.Body>
                      <Card.Title>
                        <Form.Group className="input" controlId="name">
                          <Form.Label>Codigo Encargado</Form.Label>
                          <Form.Control
                            className="input"
                            placeholder="Codigo Encargado"
                            value={codEncp}
                            onChange={(e) => setCodEncp(e.target.value)}
                            // onKeyDown={(e) => e.key === "Enter" && buscarPorCodEnc(codEncp)}
                            onKeyDown={(e) => ayudaEnc(e)}
                            // buscarPorCodEnc
                          />
                        </Form.Group>
                      </Card.Title>
                    </Card.Body>
                  </Col>
                  <Col md={1}>
                    <Button
                      className="mt-3 mb-1 bg-yellow-300 text-black py-1 px-1 rounded shadow border-2 border-yellow-300 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                      type="button"
                      title="Buscador"
                      onClick={() => handleShowEnc()}
                      >
                      <BiFileFind className="text-blue-500 font-bold text-xl" />
                    </Button>
                  </Col>

                  <Col md={3} className="mt-1 text-black py-1 px-1 rounded ">
                      <Card.Body>
                        <Card.Title>
                          <ListGroup.Item>
                            <h3>
                              {nameEnc}
                            </h3>
                          </ListGroup.Item>
                        </Card.Title>
                      </Card.Body>
                    </Col>

                  <Col md={2}>
                      <Card.Body>
                        <Card.Title>
                          <Form.Group className="input" controlId="name">
                            <Form.Label>Codigo Valor</Form.Label>
                            <Form.Control
                              className="input"
                              placeholder="Codigo Valor"
                              value={codValo}
                              onChange={(e) => setCodValo(e.target.value)}
                              // onKeyDown={(e) => e.key === "Enter" && buscarPorCodVal(codValo)}
                              onKeyDown={(e) => ayudaVal(e)}
                              // required
                              />
                          </Form.Group>
                        </Card.Title>
                      </Card.Body>
                    </Col>

                    <Col md={1}>
                            <Button
                              className="mt-3 mb-1 bg-yellow-300 text-black py-1 px-1 rounded shadow border-2 border-yellow-300 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                              type="button"
                              title="Buscador"
                              onClick={() => handleShowVal()}
                              >
                              <BiFileFind className="text-blue-500 font-bold text-xl" />
                            </Button>
                          </Col>

                  <Col md={3} className="mt-1 text-black py-1 px-1 rounded ">
                      <Card.Body>
                        <Card.Title>
                          <ListGroup.Item>
                            <h3>
                              {desVal}
                            </h3>
                          </ListGroup.Item>
                        </Card.Title>
                      </Card.Body>
                    </Col>


              </Row>

              </div>
              <div className="bordeTable">
                <div className="bordeTableinput">
                  <Row>
                    <Col md={4} sm={3} xs={12}>
                      <div className="d-grid">
                        <Button
                          type="button"
                          onClick={placeCancelaFiltro}
                          >
                          CANCELA
                        </Button>
                      </div>
                      {loading && <LoadingBox></LoadingBox>}
                    </Col>
                    <Col md={4} sm={3} xs={12}>
                      <div className="d-grid">
                        <Button
                          type="button"
                          onClick={placeLimpiaFiltro}
                          >
                          RESETEA FILTRO
                        </Button>
                      </div>
                      {loading && <LoadingBox></LoadingBox>}
                    </Col>

                    <Col md={4} sm={3} xs={12}>
                      <div className="d-grid">
                        <Button
                          type="button"
                          onClick={placeInvoiceHandler}
                          >
                          GRABA PARAMETROS
                        </Button>
                      </div>
                      {loading && <LoadingBox></LoadingBox>}
                    </Col>

                  </Row>


                </div>

                <Modal
                  size="md"
                  show={showCom}
                  onHide={() => setShowCom(false)}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                    Elija un Comprobante
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <Col md={12}>
                          <Card.Body>
                            <Card.Title>
                            <Form onSubmit={submitHandlerCom}>
                            <Form.Group className="mb-3" controlId="name">
                            {/* <Form.Group className="input" controlId="name"> */}
                                <Form.Label>Tipo Comprobante</Form.Label>
                                <Form.Select
                                  className="input"
                                  onClick={(e) => handleChangeCom(e)}
                                  >
                                  {comprobantes.map((elemento) => (
                                    <option key={elemento._id} value={elemento._id}>
                                      {elemento.nameCom}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                              <Form.Group className="mb-3" controlId="name">
                              <Form.Control
                                placeholder="Codigo Comprobante"
                                value={nameCom}
                                disabled={true}
                                required
                                />
                            </Form.Group>
                              <div className="mb-3">
                                <Button type="submit"
                                  disabled={nameCom ? false : true}
                                  >Continuar</Button>
                              </div>
                              </Form>
                            </Card.Title>
                          </Card.Body>
                        </Col>
                  </Modal.Body>
                </Modal>

                <Modal
                  size="md"
                  show={showCus}
                  onHide={() => setShowCus(false)}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                    Elija un Cliente
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <Col md={12}>
                    <Card.Body>
                      <Card.Title>
                      <Form onSubmit={submitHandlerCus}>
                            <Form.Group className="mb-3" controlId="name">
                            {/* <Form.Group className="input" controlId="name"> */}
                          <Form.Label>Clientes</Form.Label>
                          <Form.Select
                            className="input"
                            onClick={(e) => handleChangeCus(e)}
                          >
                            {customers.map((elemento) => (
                              <option key={elemento._id} value={elemento._id}>
                                {elemento.nameCus}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                              <Form.Control
                                placeholder="Cliente"
                                value={name}
                                disabled={true}
                                required
                                />
                            </Form.Group>
                              <div className="mb-3">
                                <Button type="submit"
                                  disabled={name ? false : true}
                                  >Continuar</Button>
                              </div>
                              </Form>

                      </Card.Title>
                    </Card.Body>
                  </Col>
                  </Modal.Body>
                </Modal>
                <Modal
                  size="md"
                  show={showSup}
                  onHide={() => setShowSup(false)}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                    Elija un Proovedor
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <Col md={12}>
                    <Card.Body>
                      <Card.Title>
                      <Form onSubmit={submitHandlerSup}>
                          <Form.Group className="mb-3" controlId="name">
                          {/* <Form.Group className="input" controlId="name"> */}
                          <Form.Label>Proveedor</Form.Label>
                          <Form.Select
                            className="input"
                            onClick={(e) => handleChangeSup(e)}
                          >
                            {suppliers.map((elemento) => (
                              <option key={elemento._id} value={elemento._id}>
                                {elemento.name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                              <Form.Control
                                placeholder="Proveedor"
                                value={nameSup}
                                disabled={true}
                                required
                                />
                            </Form.Group>
                              <div className="mb-3">
                                <Button type="submit"
                                  disabled={nameSup ? false : true}
                                  >Continuar</Button>
                              </div>
                              </Form>
                      </Card.Title>
                    </Card.Body>
                  </Col>
                  </Modal.Body>
                </Modal>
                <Modal
            size="md"
            show={showPro}
            onHide={() => setShowPro(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">Elija un Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Col md={12}>
              <Card.Body>
                <Card.Title>
                  <Card.Title>
                      <Form onSubmit={submitHandlerPro}>
                        <Form.Group className="mb-3" controlId="name">
                        {/* <Form.Group className="input" controlId="name"> */}
                        <Form.Label>Productos</Form.Label>


                      <Form.Select
                        className="input"
                        onClick={(e) => handleChangePro(e)}
                        disabled={isPaying}
                      >
                        {productss.map((elementoP) => (
                          <option key={elementoP._id} value={elementoP._id}>
                            {elementoP.title}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                              <Form.Control
                                placeholder="Producto"
                                value={desPro}
                                disabled={true}
                                required
                                />
                            </Form.Group>
                              <div className="mb-3">
                                <Button type="submit"
                                  disabled={desPro ? false : true}
                                  >Continuar</Button>
                              </div>
                              </Form>


                  </Card.Title>
                </Card.Title>
              </Card.Body>
            </Col>
            </Modal.Body>
          </Modal>
          <Modal
                  size="md"
                  show={showEnc}
                  onHide={() => setShowEnc(false)}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                    Elija un Encargado
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <Col md={12}>
                    <Card.Body>
                      <Card.Title>
                      <Form onSubmit={submitHandlerEnc}>
                          <Form.Group className="mb-3" controlId="name">
                          {/* <Form.Group className="input" controlId="name"> */}
                          <Form.Label>Encargado</Form.Label>
                          <Form.Select
                            className="input"
                            onClick={(e) => handleChangeEnc(e)}
                          >
                            {encargados.map((
                              elemento) => (
                              <option key={elemento._id} value={elemento._id}>
                                {elemento.name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                              <Form.Control
                                placeholder="Encargado"
                                value={nameEnc}
                                disabled={true}
                                required
                                />
                            </Form.Group>
                              <div className="mb-3">
                                <Button type="submit"
                                  disabled={nameEnc ? false : true}
                                  >Continuar</Button>
                              </div>
                              </Form>
                      </Card.Title>
                    </Card.Body>
                  </Col>
                  </Modal.Body>
                </Modal>
                <Modal
                  size="md"
                  show={showUse}
                  onHide={() => setShowUse(false)}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                    Elija un Usuario
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <Col md={12}>
                    <Card.Body>
                      <Card.Title>
                      <Form onSubmit={submitHandlerUse}>
                          <Form.Group className="mb-3" controlId="name">
                          {/* <Form.Group className="input" controlId="name"> */}
                          <Form.Label>Usuario</Form.Label>
                          <Form.Select
                            className="input"
                            onClick={(e) => handleChangeUse(e)}
                          >
                            {users.map((
                              elemento) => (
                              <option key={elemento._id} value={elemento._id}>
                                {elemento.name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                              <Form.Control
                                placeholder="Usuario"
                                value={nameUse}
                                disabled={true}
                                required
                                />
                            </Form.Group>
                              <div className="mb-3">
                                <Button type="submit"
                                  disabled={nameUse ? false : true}
                                  >Continuar</Button>
                              </div>
                              </Form>
                      </Card.Title>
                    </Card.Body>
                  </Col>
                  </Modal.Body>
                </Modal>
                <Modal
                  size="md"
                  show={showCon}
                  onHide={() => setShowCon(false)}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                    Elija un Pto Venta
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <Col md={12}>
                    <Card.Body>
                      <Card.Title>
                      <Form onSubmit={submitHandlerCon}>
                          <Form.Group className="mb-3" controlId="name">
                          {/* <Form.Group className="input" controlId="name"> */}
                          <Form.Label>Ptos Venta</Form.Label>
                          <Form.Select
                            className="input"
                            onClick={(e) => handleChangeCon(e)}
                          >
                            {configurations.map((
                              elemento) => (
                              <option key={elemento._id} value={elemento._id}>
                                {elemento.name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                              <Form.Control
                                placeholder="Ptos Venta"
                                value={nameCon}
                                disabled={true}
                                required
                                />
                            </Form.Group>
                              <div className="mb-3">
                                <Button type="submit"
                                  disabled={nameCon ? false : true}
                                  >Continuar</Button>
                              </div>
                              </Form>
                      </Card.Title>
                    </Card.Body>
                  </Col>
                  </Modal.Body>
                </Modal>

                <Modal
            // input22Ref={input22Ref}
            size="md"
            show={showVal}
            onHide={() => setShowVal(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
              Elija un Valor
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Col md={12}>
              <Card.Body>
                <Card.Title>
                  <Card.Title>
                      <Form onSubmit={submitHandlerVal}>
                        <Form.Group className="mb-3" controlId="name">
                        {/* <Form.Group className="input" controlId="name"> */}
                         <Form.Label>Description de Valor</Form.Label>
                      <Form.Select
                        className="input"
                        onClick={(e) => handleChangeVal(e)}
                        // disabled={isPaying}
                      >
                        {valuees.map((elementoP) => (
                          <option key={elementoP._id} value={elementoP._id}>
                            {elementoP.desVal}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Control
                        placeholder="Valor"
                        value={desVal}
                        disabled={true}
                        required
                        />
                    </Form.Group>
                      <div className="mb-3">
                        <Button type="submit"
                          // ref={input22Ref}
                          disabled={desVal ? false : true}
                          >Continuar</Button>
                      </div>
                      </Form>


                  </Card.Title>
                </Card.Title>
              </Card.Body>
            </Col>
            </Modal.Body>
          </Modal>





              </div>
            </div>
          </>
        ) : (
          <>
            <Button onClick={() => clearitems()}>Nueva Factura</Button>

          </>
        )}
      </main>
    </>
  );
}

export default AppFiltro;
