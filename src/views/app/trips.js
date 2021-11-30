import React, { useMemo, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Row,
  Card,
  CardBody,
  Button,

} from 'reactstrap';
import moment from 'moment';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import products from '../../data/products';
import CustomTable from '../../containers/ui/ReactTableCards';
import { TripTable, userTripDelete } from "../../redux/userTrip/actions";
import { getCurrentUser } from '../../helpers/Utils';





const Trips = ({ TripTableAction, tripTable, userTripDeleteAction, loading}) => {


  const history = useHistory();


  const tripTableData = () => {
    let user_id = getCurrentUser().id
    if(getCurrentUser().roles=== 3 || getCurrentUser().roles=== 2)
    user_id = getCurrentUser().admin_id
    TripTableAction(user_id, history)
  }

  useEffect(() => {
    
    tripTableData()
  }, [])

  const triptabledataforemp = []

  tripTable.map(p=>{ if(p.profile.includes(getCurrentUser().profile_id))
  {
    triptabledataforemp.push(p)
  }
  })
console.log(triptabledataforemp)

  const handleEdit = id => {
    console.log("id", id)
  }

  const handleDelete = id => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui card-shadow'>
            <h1>Are you sure?</h1>
            <p>You want to delete this Trip?</p>
            <Button type="button"
              className="mr-2"
              onClick={() => {
                if (!loading) {
                  userTripDeleteAction(id, history)
                  onClose();

                }
              }}
            >
              Yes, Delete it!
            </Button>
            <Button type="button" onClick={onClose}>No</Button>

          </div>
        );
      }
    });
  }
  const cols = useMemo(
    () => [
      {
        Header: 'Trip Name',
        accessor: 'name',
        cellClass: 'list-item-heading',
        Cell: (props) => <>{props.value}</>,
      },
      /*  {
         Header: 'Last Updated',
         accessor: 'status',
         cellClass: 'text-muted',
         Cell: (props) => <>{props.value}</>,
       }, */
      {
        Header: 'Start Date',
        accessor: d => `${d.startDate ? moment(d.startDate).format("D/M/YYYY") : "-"}`,
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'End Date',
        accessor: d => `${d.endDate ? moment(d.endDate).format("D/M/YYYY") : "-"}`,
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Company',
        accessor: 'company',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Department',
        accessor: 'department',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      }, {
        Header: 'Domestic / International',
        accessor: d=>'Domestic',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Flight Sectors',
        accessor: 'flight_count',
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Travellers',
        accessor: d => `${d.profile.split(',').length}`,
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      }, {
        Header: 'Active Request',
        accessor: d => `${new Date(d.endDate) > new Date() ? "Active" : "Expired"}`,
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Documents',
        accessor: 'trip_document_count',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Status',
        accessor: d => {
          // `${new Date(d.endDate) > new Date() ? "Upcoming" : "Historic"}`
          if(new Date(d.endDate).toDateString() === new Date().toDateString()) return "In Progress";
          if(new Date(d.endDate) > new Date())  return "Upcoming";
          return "Historic";
        },
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },
      /* {
        Header: 'View Trip',
        accessor: '',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      }, */
       
        
      {
        Header: 'Actions',
        accessor: 'id',
        cellClass: 'text-muted ',
        Cell: (props) =>  getCurrentUser().roles ===1 
        ? <div className="d-flex"><Link size="md" className="btn btn-warning buttoneditdelcss mr-2" to={`/app/Trips/edit/${props.value}`} >Edit</Link>
          <Button size="md" className="buttoneditdelcss" onClick={() => handleDelete(props.value)}>Delete</Button></div>
    :
    <div className="d-flex"><Link size="md" className="btn btn-warning buttoneditdelcss mr-2" to={`/app/Trips/edit/${props.value}`} >Edit</Link></div>  
    }


    ],
    []
  );
  return (
    <>
      <Row>
        <Colxx xxs="4">
          <Button size="lg" onClick={() => history.push('/app/Trips/create')}>Create New Trip<sup> +</sup></Button>     </Colxx>
      </Row>
      <Row>

        <Colxx xxs="12" >
          <Card className="my-4">
            <CardBody>
              <CustomTable columns={cols}  data={getCurrentUser().roles=== 3? triptabledataforemp: tripTable} />
            </CardBody>
          </Card>
        </Colxx>

      </Row>
    </>
  );
};


const mapStateToProps = ({ tripUser }) => {
  const { tripTable, loading } = tripUser;
   console.log("trip table", tripTable)

  return { tripTable, loading };


};


export default connect(mapStateToProps, { TripTableAction: TripTable, userTripDeleteAction: userTripDelete })(Trips)

