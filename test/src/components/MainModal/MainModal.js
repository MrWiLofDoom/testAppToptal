import React, { Component } from 'react';
import { Modal } from '@material-ui/core';
import _ from 'lodash';
import './MainModal.css';
import PropTypes from 'prop-types';
import { Rating } from '@material-ui/lab';

import { Check, Close } from '@material-ui/icons';

class MainModal extends Component {
    render () {
        const {handleClose, open, data} = this.props;
        const noData = _.isEmpty(data);
        return (
            <Modal
                id={'main-modal'}
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={open}
                onClose={handleClose}
            >

                <div id={'modal-container'}>
                    {!noData &&
                    <div id={'modal-container-holder'}>
                        <div id={'modal-container-meta'}>
                            <h1>{data.restaurant_name || ''}</h1>
                            <div id={'modal-rating'}>
                                <div>Average Rating: {data.rank.rating || 0}</div>
                                <Rating readOnly={true} size={'medium'} name='rating' value={Number(data.rank.rating) || 0}
                                        precision={0.5}/>
                            </div>
                        </div>
                        <div id={'modal-container-ratings'}>
                            <div id={'modal-container-best-rating'}>
                                <div className={'rating-header'}>BEST <Check className={'best-icon'}/></div>
                                <div>{data.bestReview.review}</div>
                            </div>
                            <div id={'modal-container-worst-rating'}>
                                <div className={'rating-header'}>WORST <Close className={'worst-icon'}/></div>
                                <div>{data.worstReview.review}</div>
                            </div>
                        </div>
                    </div>
                    }
                    {noData && <h1>No Data</h1>}
                </div>


            </Modal>
        );
    }
}

MainModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    data: PropTypes.object
};

export default MainModal;