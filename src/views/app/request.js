import React, { useMemo, useEffect } from 'react';
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,

} from 'reactstrap';
import moment from 'moment';
import IntlMessages from '../../helpers/IntlMessages';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import products from '../../data/products';
import CustomTable from '../../containers/ui/ReactTableCards';
import { requestTable , requestDelete} from "../../redux/request/actions";
import { getCurrentUser } from '../../helpers/Utils';
import { DocTable } from '../../redux/actions';



const Request = ({ requestTableAction, loading, requestTableData , requestDeleteAction}) => {

  const history = useHistory();

  const requestData = () => {
    let user_id = getCurrentUser().id
    if(getCurrentUser().roles=== 3 ||getCurrentUser().roles=== 2 )
     user_id = getCurrentUser().admin_id
    requestTableAction(user_id, history)
  }
const detailsparsedata=[];
const requestforemp=[];
requestTableData.map(r=>
   detailsparsedata.push(...JSON.parse(r.details).map(p=>
    {
      if(p.profile_id === getCurrentUser().profile_id)
      requestforemp.push(r)
    })))
// detailsparsedata.map(p=> 
//   {
//   if(p.profile_id === getCurrentUser().profile_id)
//   {
//     // console.log("check",JSON.stringify(p))
    
//   }
  console.log("requestforemp",requestforemp)
// })
  useEffect(() => {
    requestData()
  }, [])

  const requestType = [
    {
      id:1, name:"Offline booking"
    },
    {
      id: 2, name: 'Check-In'
    },
    {
      id: 3, name: "Meal-Request"
    },
    {
      id: 4, name: "Seat Request"
    },
    { 
      id: 5, name: "Extra Baggage" 
    },
   
    {
      id:6, name:"Special Request"
    },
    {
      id:7, name:"Upgrade"
    },
    {
      id:8, name:"Lost Baggage"
    },
    {
      id:9, name:"Airline airport Complaint"
    },
    {
      id:10, name:"Flight change Cancellation"
    },
    {
      id:11, name:"Flight Refund"
    },
    {
      id:12, name:"Missed Flight Assistance"
    },
    {
      id:13, name:"Visa Documentation"
    },
   
    {
      id:14, name:"Covid-19"
    },
  
    {
      id:15, name:"Entry Requirements"
    }
  ]

  const requestStatus = [
    {
      id: 1, name: 'Requested'
  },
  {
      id: 2, name: "Rejected"
  },
  {
      id: 3, name: "In Process"
  },
  {
      id: 4, name: "Completed"
  }

]

  const handleEdit = id => {
    console.log("id", id)
  }
  const handleDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui card-shadow'>
            <h1>Are you sure?</h1>
            <p>You want to delete this Request?</p>
            <Button type="button"
              className="mr-2"
              onClick={() => {
                if(!loading){
                requestDeleteAction(id, history)

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
        accessor: 'trip_name',
        cellClass: 'list-item-heading',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Request Type',
        accessor: d => `${requestType.filter(r => r.id === d.type).map(r => r.name)} `,
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Request Date',
        accessor: d => `${d.date? moment(d.date).format("D/M/YYYY") : "-"} `,
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Relates to',
        accessor:  d=>`${JSON.parse(d.details).map(data=>data.profile_name)}`,
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Linked Documents',
        accessor: 'doc_count',
        cellClass: 'text-muted  w-20',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Company',
        accessor: 'trip_company',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      }, {
        Header: 'Department',
        accessor: 'trip_department',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Status',
        accessor: d=>`${requestStatus.filter(r => r.id === d.status).map(r => r.name)}`,
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      
      // getCurrentUser().roles !== 3 ? 
      {
        Header: 'Actions',
        accessor: 'id',
        cellClass: 'text-muted',
        // Cell: (props) => <div className="d-flex"><Button size="md" className="btn btn-warning buttoneditdelcss mr-2" onClick={() => handleEdit(props.value)}>Edit</Button>
           Cell: (props) => <Button size="buttoneditdelcss md" onClick={() => handleDelete(props.value)}>Delete</Button>,

      }
      // :
      // {
      //   Header: '',
      //   accessor: 'personal_number',
      //   cellClass: 'text-muted ',
      //   Cell: (props) => <>{props.value}</>,
      // },


    ],
    []
  );
  return (
    <>
      <Row>
        <Colxx xxs="4">
          <Button size="lg" onClick={() => history.push('/app/Request/view')}>Create New Request<sup> +</sup></Button>
        
        </Colxx>
      </Row>
      <Row>

        <Colxx xxs="12" >
          <Card className="my-4">
            <CardBody>
              <CustomTable columns={cols} data={getCurrentUser().roles=== 3? requestforemp: requestTableData} />
            </CardBody>
          </Card>
        </Colxx>

      </Row>
    </>
  );
};


const mapStateToProps = ({ userRequest }) => {
  const { requestTableData, loading } = userRequest;

  /* console.log("request table Data===>", requestTableData) */
  return { requestTableData, loading };


};


export default connect(mapStateToProps, { requestTableAction: requestTable, requestDeleteAction: requestDelete })(Request)


