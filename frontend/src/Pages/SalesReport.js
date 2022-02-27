import React, { useEffect, forwardRef } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col, Form,Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import MaterialTable from 'material-table'
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

const SalesReport = () => {

  const columns = [
    { title: 'Product ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Quantity sold', field: 'qty', type: 'numeric' },
    { title: 'Quantity paid for', field: 'paidQty', type: 'numeric' },
    {
      title: 'Amount paid',
      field: 'paid',
      type: 'currency',
      currencySetting: {
        locale: 'en',
        currencyCode: 'inr',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
    },
    {
      title: 'Pending amount',
      field: 'unpaid',
      type: 'currency',
      currencySetting: {
        locale: 'en',
        currencyCode: 'inr',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
    },
  ]
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [products, setProducts] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [lower, setLower] = React.useState('2000-01-01')
  const [upper, setUpper] = React.useState('2040-01-01')
  const [year, setYear] = React.useState(2022)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const submitHandler = (e) => {
    e.preventDefault()
    fetchData()
  }

  const fetchData = async () => {
    const { data } = await axios.get(
      `/api/orders/salesreport/${upper}?lower=${lower}`
    )
    setProducts(data.products)
  }

  const fetchDataByYear = async () => {
    const { data } = await axios.get(
      `/api/orders/report/${year}-12-21?lower=${year}-01-01`
    )
    setProducts(data.products)
  }

  const fetchDataByMonth = async (monthFromForm) => {
    const { data } = await axios.get(
      `/api/orders/report/${year}-${monthFromForm}-28?lower=${year}-${monthFromForm}-01`
    )
    setProducts(data.products)
  }
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    }

    fetchData()
  }, [dispatch, userInfo])

  return (
    <Container>
      <Form className="my-3" onSubmit={submitHandler}>
        <Row>
          <Col md={2}>
            <label htmlFor="lower">From</label>
            <input
              type="date"
              className="form-control"
              id="lower"
              onChange={(e) => {
                e.preventDefault()
                setLower(e.target.value)
              }}
              name="birthday"
            ></input>
          </Col>
          <Col md={2}>
            <label htmlFor="upper">To</label>
            <input
              type="date"
              className="form-control"
              id="upper"
              onChange={(e) => {
                e.preventDefault()
                setUpper(e.target.value)
              }}
              name="birthday"
            ></input>
          </Col>
          <Col md={2}>
            <Button className="datebutton" type="submit">
              Find
            </Button>
          </Col>
          <Col>
            <label htmlFor="upper">Find by year</label>
            <input
              type="number"
              className="form-control"
              placeholder="Select year"
              onChange={(e) => {
                e.preventDefault()
                setYear(e.target.value)
              }}
            ></input>
          </Col>
          <Col>
            <Button onClick={fetchDataByYear} className="datebutton">
              Find
            </Button>
          </Col>
          <Col>
            <label htmlFor="upper">Find by month</label>
            <Form.Control
              as="select"
              onChange={(e) => {
                e.preventDefault()
                fetchDataByMonth(e.target.value)
              }}
            >
              <option name="" value="">
                MM
              </option>
              <option name="January" value={1}>
                January
              </option>
              <option name="February" value={2}>
                February
              </option>
              <option name="March" value={3}>
                March
              </option>
              <option name="April" value={4}>
                April
              </option>
              <option name="May" value={5}>
                May
              </option>
              <option name="June" value={6}>
                June
              </option>
              <option name="July" value={7}>
                July
              </option>
              <option name="August" value={8}>
                August
              </option>
              <option name="September" value={9}>
                September
              </option>
              <option name="October" value={10}>
                October
              </option>
              <option name="November" value={11}>
                November
              </option>
              <option name="December" value={12}>
                December
              </option>
            </Form.Control>
          </Col>
        </Row>
      </Form>
      <MaterialTable
        icons={tableIcons}
        data={products}
        columns={columns}
        title={'Sales Report'}
        options={{
          filtering: true,
          pageSize: 10,
          pageSizeOptions: [10, 20, 30, 40, 50],
          exportButton: true,
          exportAllData: true,
        }}
      />
    </Container>
  )
}

export default SalesReport