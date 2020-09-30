import React from 'react';
import {ReactComponent as YouTubeIcon} from '../../../assets/img/svg/youtube.svg';
import {ReactComponent as TwitterIcon} from '../../../assets/img/svg/twitter.svg';
import {ReactComponent as FacebookIcon} from '../../../assets/img/svg/facebook.svg';
import {ReactComponent as LinkedInIcon} from '../../../assets/img/svg/linkedin.svg';
import './SocialMedia.scss';

export default function SocialMedia(){
    return(
        <div className="social-media">
            <a 
            href="https://www.youtube.com/channel/UCcicBIIGoz_F5ChQ_ZPkWiw"
            className="youtube"
            target="_blank"
            rel="noopener noreferrer"
            >
                <YouTubeIcon/>
            </a>

            <a
            href="https://twitter.com/xagustin93?lang=en"
            className="twitter"
            target="_blank"
            rel="noopener noreferrer"
            >
                <TwitterIcon/>
            </a>

            <a
            href="https://www.facebook.com/jccamargo"
            className="facebook"
            target="_blank"
            rel="noopener noreferrer"
            >
                <FacebookIcon/>
            </a>

            <a
            href="https://www.linkedin.com/in/juan-camilo-camargo-montes-68274862"
            className="linkedin"
            target="_blank"
            rel="noopener noreferrer"
            >
                <LinkedInIcon/>
            </a>
        </div>
    )
}