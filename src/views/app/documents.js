import React, { useMemo ,useEffect} from 'react';
import {useHistory, Link} from "react-router-dom";
import {connect} from "react-redux";
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
import {DocTable, userDelete} from "../../redux/userDocuments/actions";
import { getCurrentUser } from '../../helpers/Utils';




const Document= ({loading, DocTableAction, docTable, userDeleteAction}) => {

  const history = useHistory();


  const docTableData = () => {
    let user_id = getCurrentUser().id
    if(getCurrentUser().roles=== 3 || getCurrentUser().roles=== 2)
     user_id = getCurrentUser().admin_id
    DocTableAction(user_id, history)
  }

  useEffect(() => {
    docTableData()
  }, [])

  const doctableforemp=[]
  docTable.map(d=>{ if(d.trip_id===null)
   if(d.profile_id===getCurrentUser().profile_id)
  {
   doctableforemp.push(d)
   }
  })
// docTable.map(d=>{ if(d.profile_id.includes(getCurrentUser().profile_id))
//   {
//     doctableforemp.push(d)
//   }
//   })

  const handleEdit = id => {
    console.log("id", id)
  }
  const handleDelete = id => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui card-shadow'>
            <h1>Are you sure?</h1>
            <p>You want to delete this Document?</p>
            <Button type="button"
              className="mr-2"
              onClick={() => {
                if (!loading) {
                  userDeleteAction(id, history)
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
        Header: 'Document Name',
        accessor: 'document_name',
        cellClass: 'list-item-heading',
        Cell: (props) => <>{props.value}</>,
      },
     /*  {
        Header: 'Last Modified',
        accessor: 'status',
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      }, */
      {
        Header: 'Profile / Trip Document',
        accessor: 'trip_profile_document',
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Profile / Trip Name',
        accessor: d=>`${d.trip_id ? d.trip_name : `${d.profile_fname} ${d.profile_mname} ${d.profile_lname}`}`,
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Document Category',
        accessor: 'document_category',
        cellClass: 'text-muted  w-20',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Document Sub-category',
        accessor: 'document_subcategory',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Valid From',
        accessor:  d => `${d.valid_from ? moment(d.valid_from).format("D/M/YYYY") : "-"} `,
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Valid To',
        accessor: d => `${d.valid_to ? moment(d.valid_to).format("D/M/YYYY") : "-"} `,
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      }, {
        Header: 'Document Parts',
        accessor: 'image_count',
        cellClass: 'text-muted',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Company',
        accessor: d=>`${d.trip_id ? d.trip_company : d.profile_company}`,
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Department',
        accessor: d=>`${d.trip_id ? d.trip_department : d.profile_department}`,
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Status',
        accessor: d => `${new Date(d.valid_to) > new Date() ? "Valid" : "Expired"}`,
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      },
      /* {
        Header: 'View Document',
        accessor: '',
        cellClass: 'text-muted ',
        Cell: (props) => <>{props.value}</>,
      }, */
      {
        Header: 'Actions',
        accessor: 'id',
        cellClass: 'text-muted ',
        Cell: (props) =>  getCurrentUser().roles ===1 ?
         <div className="d-flex"><Link size="md" className="btn btn-warning buttoneditdelcss mr-2" to={`/app/Documents/edit/${props.value}`} >Edit</Link>
          <Button size="md" className="buttoneditdelcss" onClick={() => handleDelete(props.value)}>Delete</Button></div>
          :
          <div className="d-flex"><Link size="md" className="btn btn-warning buttoneditdelcss mr-2" to={`/app/Documents/edit/${props.value}`} >Edit</Link>
          </div>

      },


    ],
    []
  );
  return (
    <>
   

      <Row>
        <Colxx xxs="4">
               <div>
          <Button size="lg" onClick={()=>history.push('/app/Documents/create')}>Create New Document<sup> +</sup></Button>
        </div>
        </Colxx>
      </Row>
      <Row>

        <Colxx xxs="12" >
          <Card className="my-4">
            <CardBody>
              <CustomTable columns={cols}  data={getCurrentUser().roles=== 3? doctableforemp: docTable} />
            </CardBody>
          </Card>
        </Colxx>

      </Row>
    </>
  );
};


const mapStateToProps = ({ DocUser }) => {
  const { docTable, loading } = DocUser;
   console.log("doc table", docTable)

  return { docTable, loading };


};



export default connect(mapStateToProps, { DocTableAction: DocTable, userDeleteAction : userDelete})(Document)


