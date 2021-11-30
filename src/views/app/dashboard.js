import React, { useState , useEffect} from 'react';
import { connect } from 'react-redux'
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useHistory} from "react-router-dom"
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../../containers/navs/Breadcrumb';
import IconCardsCarousel from '../../containers/dashboards/IconCardsCarousel';
import SalesChartCard from '../../containers/dashboards/SalesChartCard';
import IntlMessages from '../../helpers/IntlMessages';
import ProfileStatuses from '../../containers/dashboards/ProfileStatuses';
import IconCard from '../../components/cards/IconCard';
import {getCurrentUser} from '../../helpers/Utils';
import RequestView from './request/requestview';






const Dashboard = ({ match , props}) => {

  const [startDateRange, setStartDateRange] = useState(new Date());
  const [endDateRange, setEndDateRange] = useState(new Date());
  const history = useHistory();

 

  const data = getCurrentUser().roles !==3?[
    
    // {
    //   id:1,
    //   icon: 'iconsminds-administrator',
    //   title: 'Create new profile',

    // },
    
    // {
    //   id:2,
    //   icon: 'iconsminds-add-file',
    //   title: 'Create new document',

    // },
    // {
    //   id:3,
    //   icon: 'iconsminds-palm-tree',
    //   title: 'Create new trip',

    // },
    // {
    //   id:4,
    //   icon: 'iconsminds-check',
    //   title: 'Create new request',

    // },
    
  ]: [];

  const handleClick = (id)=>{
    if(id === 1){
      history.push("/app/Profile/create")
    }
    else if(id === 2){
      history.push("/app/Documents/create")
    }
    else if(id === 3){
      history.push("/app/Trips/create")
    }
    else if(id === 4){
      history.push("/app/Request/view")
    }
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h4>Welcome back, {getCurrentUser().name.split(" ")[0]}! How can we help you?</h4>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="12" xl="12">
          <CardTitle className="mb-4">
           {/*  <IntlMessages id="cards.icon-card" /> */}
          </CardTitle>
          <Row className="icon-cards-row mb-2 d-flex justify-content-center">
            {data.map((item, index) => {
              return (
                <Colxx xxs="6" sm="4" md="6" lg="3"  key={`icon_card_${item.id}`} onClick={()=>handleClick(item.id)}>
                  <IconCard {...item} className="mb-4" style={{fontSize : "65px"}} />
                </Colxx>
              );
            })}
          </Row>
          <Row>
            <Colxx>
            <RequestView />
            </Colxx>
            {/* <Colxx md="6" className="mb-4">
              <Card className="h-100">
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="My travel calendar" />
                  </CardTitle>
                  <DatePicker
                    calendarClassName="embedded"
                    inline
                    minDate={new Date()}
                    selected={endDateRange}
                    selectsEnd
                    startDate={startDateRange}
                    endDate={endDateRange}
                    onChange={setEndDateRange}
                  />
                </CardBody>
              </Card>

            </Colxx> */}
            {/* <Colxx md="6" className="mb-4">
              <SalesChartCard />
            </Colxx> */}
          </Row>
          <Row>
            <Colxx>
              {/* <ProfileStatuses /> */}
            </Colxx>
          </Row>
        </Colxx>

      </Row>
    </>

  )
};


export default Dashboard;
