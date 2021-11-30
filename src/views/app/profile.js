import React, { useEffect, useMemo } from 'react';
import { Link, useHistory } from "react-router-dom";
import { connect } from 'react-redux';

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
import { ProfileTable, ProfileDelete } from "../../redux/userProfile/actions";
import { getCurrentUser } from '../../helpers/Utils';







const Profile = ({ ProfileTableAction, profileTable, ProfileDeleteAction }) => {
  const history = useHistory();


  const profileTableData = () => {
    let user_id = getCurrentUser().id
    if(getCurrentUser().roles=== 3 ||getCurrentUser().roles=== 2 )
     user_id = getCurrentUser().admin_id
    ProfileTableAction(user_id, history)
  }

  useEffect(() => {
    profileTableData()
  }, [])

 console.log("datata", profileTable) 


 

  const handleEdit = id => {
    console.log("id", id)
  }
  const handleDelete = (id, loading) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui card-shadow'>
            <h1>Are you sure?</h1>
            <p>You want to delete this Profile?</p>
            <Button type="button"
              className="mr-2"
              onClick={() => {
                if(!loading){
                ProfileDeleteAction(id, history)

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
        Header: 'Name',
        accessor: d => `${d.first_name} ${d.middle_name} ${d.last_name}`,
        cellClass: 'list-item-heading',
        Cell: (props) => <>{props.value}</>,
      },

      /* {
        Header: 'Last Updated',
        accessor: 'status',
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      }, */
      {
        Header: 'Company',
        accessor: 'company',
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Department',
        accessor: 'department',
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Joining Date ',
        accessor: d => `${d.joining_date ? moment(d.joining_date).format("D/M/YYYY") : "-"} `,
        cellClass: 'text-muted  w-20',
        Cell: (props) => <>{props.value}</>,
      }, 
      {
        Header: 'Leaving Date',
        accessor: d => `${d.leaving_date ? moment(d.leaving_date).format("D/M/YYYY"): "N/A"}`,
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Status',
        accessor: d => `${new Date(d.leaving_date).getTime() > new Date().getTime() ||new Date(d.leaving_date).getTime()===0 ?"Active": "Inactive"}`,
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      }
      ,{
        Header: 'Company Mobile',
        accessor: 'company_number',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Company Email Id',
        accessor: 'company_email',
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Frequent Flyer a/c',
        accessor: 'flyer_count',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      }, {
        Header: 'Travel Docs',
        accessor: 'travel_document_count',
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Current / Upcoming Trips',
        accessor: 'trip_count',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Documents',
        accessor: 'document_count',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },
      /* {
        Header: 'View Profile',
        accessor: '',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      }, */
      
       getCurrentUser().roles !== 3 ? 
        {
        Header: 'Actions',
        accessor: 'id',
        cellClass: 'text-muted ',
        Cell: (props) => getCurrentUser().roles ===1 
        ?  <div className="d-flex"><Link size="md" className="btn btn-warning buttoneditdelcss mr-2" to={`/app/Profile/edit/${props.value}`} >Edit</Link>
          <Button size="buttoneditdelcss md" onClick={() => handleDelete(props.value)}>Delete{/* <i className="iconsminds-file-trash large-icon" /> */}</Button></div>
          :
          <div className="d-flex"><Link size="md" className="btn btn-warning buttoneditdelcss mr-2" to={`/app/Profile/edit/${props.value}`} >Edit</Link></div>,
        }
    :
    {
      Header: 'Personal Number',
      accessor: 'personal_number',
      cellClass: 'text-muted ',
      Cell: (props) => <>{props.value}</>,
    },
    ],
    []
  );
  return (
    <>
      <Row>
        <Colxx xxs="4">
        {getCurrentUser().roles !== 3 ?
         <div>
  <Button size="lg" onClick={() => history.push('/app/Profile/create')}>Create New Profile <sup> +</sup></Button>
          </div>
          :
          <Button size="lg" onClick={() => history.push(`/app/Profile/edit/${getCurrentUser().profile_id}`)}>Edit my profile <sup> +</sup></Button>
        }
          {/* <Separator className="mb-5" /> */}
        </Colxx>
      </Row>
      <Row>

        <Colxx xxs="12" >
          <Card className="my-4">
            <CardBody>
              <CustomTable columns={cols} data={profileTable} />
            </CardBody>
          </Card>
        </Colxx>

      </Row>
    </>
  );
};

const mapStateToProps = ({ profileUser }) => {
  const { profileTable, loading } = profileUser;

  /*    console.log("useeeee", userProfile) */
  return { profileTable, loading };


};


export default connect(mapStateToProps, { ProfileTableAction: ProfileTable, ProfileDeleteAction: ProfileDelete })(Profile)
