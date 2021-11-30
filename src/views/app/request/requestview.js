import React, { Fragment, useState } from 'react';
import 'react-phone-number-input/style.css';
import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle,
} from 'reactstrap';
import {useHistory} from "react-router-dom"
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IconCard from '../../../components/cards/IconCard';



const RequestView = (props) => {

    const history = useHistory();
    const data = [

        {
            id: 1,
            icon: 'simple-icon-phone',
            title: 'Offline booking',

        },
        {
            id: 2,
            icon: 'simple-icon-login',
            title: 'Check-in',

        },

        {
            id: 3,
            icon: 'iconsminds-chopsticks',
            title: 'Meals',

        },
        {
            id: 4,
            icon: 'iconsminds-chair',
            title: 'Seating',

        },
        {
            id: 5,
            icon: 'simple-icon-handbag',
            title: 'Extra baggage',

        },
        {
            id: 6,
            icon: 'simple-icon-star',
            title: 'Special request',

        },
       
        {
            id: 7,
            icon: ' iconsminds-upgrade',
            title: 'Upgrade',

        },
        {
            id: 8,
            icon: 'simple-icon-bag',
            title: 'Lost baggage',

        },
        {
            id: 9,
            icon: 'simple-icon-plane',
            title: 'Airline / airport complaint',

        },
        {
            id: 10,
            icon: 'simple-icon-close',
            title: 'Flight change / cancellation',

        },
        {
            id: 11,
            icon: 'iconsminds-coins',
            title: 'Flight Refund',

        },
        {
            id: 12,
            icon: 'iconsminds-coins',
            title: 'Missed flight assistance',

        },
       
        {
            id: 13,
            icon: 'simple-icon-docs',
            title: 'Visa Documentation',

        },
       
        {
            id: 14,
            icon: 'simple-icon-doc',
            title: 'COVID support',

        },
       
        {
            id: 15,
            icon: 'iconsminds-japanese-gate',
            title: 'Entry requirements',

        },

    ];

    const handleClick = (id) => {
        if (id === 2) {
            history.push("/app/Request/view/checkin")
        }
        else if (id === 3) {
            history.push("/app/Request/view/meal-request")
        }
        else if (id === 4) {
            history.push("/app/Request/view/seat-request")
        }
        else if (id === 5) {
            history.push("/app/Request/view/extra-baggage")
        }
        else if (id === 6) {
            history.push("/app/Request/view/special-request")
        }
        else if (id === 7) {
            history.push("/app/Request/view/upgrade-request")
        }
        else if (id === 8) {
            history.push("/app/Request/view/lost-baggage")
        }
        else if(id ===9){
            history.push("/app/Request/view/airplane-complaint")
        }
        else if(id ===10){
            history.push("/app/Request/view/flight-cancel")
        }
        else if (id === 11) {
            history.push("/app/Request/view/flight-refund")
        }
        else if (id === 12) {
            history.push("/app/Request/view/missed-flight-assistance")
        }
        else if (id === 13) {
            history.push("/app/Request/view/visa-documentation")
        }
       
        // else if (id === 14) {
        //     history.push("/app/Request/view/covid-19")
        // }
      
        else if (id === 15) {
            history.push("/app/Request/view/entry-requirements")
        }
    }

    return (


        <>
            <Row className="mb-4 d-flex justify-content-center">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                {/* <IntlMessages id="Request View" /> */}
                            </CardTitle>
                            <Row className="icon-cards-row mb-2">
                                {data.map((item, index) => {
                                    return (
                                        <Colxx xxs="6" sm="4" md="6" lg="3" key={`icon_card_${item.id}`} onClick={() => handleClick(item.id)}>
                                            <IconCard {...item} className="mb-4" />
                                        </Colxx>
                                    );
                                })}
                            </Row>

                        </CardBody>
                    </Card>
                </Colxx>


            </Row>


        </>
    );
}

export default RequestView;

