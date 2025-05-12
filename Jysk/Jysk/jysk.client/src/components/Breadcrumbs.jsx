import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import '../styles/components/Breadcrumbs.scss';
import BodySection from "../components/BodySection";
import arrowRightIcon from '../assets/icons/arrow-down.svg'; 

export default function Breadcrumbs() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const pushedName = location.state?.productName;

  return (
    <BodySection noBorder>
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>

        {pathnames.map((seg, idx) => {
          const isLast = idx === pathnames.length - 1;
          const to     = '/' + pathnames.slice(0, idx + 1).join('/');
          const label  =
            isLast && seg === 'product'
              ? pushedName ?? 'Product'
              : seg.charAt(0).toUpperCase() + seg.slice(1);

          return (
            <React.Fragment key={to}>
              <img
                src={arrowRightIcon}
                alt=">"
                className="breadcrumb-separator"
              />

              {isLast
                ? <span>{label}</span>
                : <Link to={to}>{label}</Link>
              }
            </React.Fragment>
          );
        })}
      </nav>
    </BodySection>
  );
}
