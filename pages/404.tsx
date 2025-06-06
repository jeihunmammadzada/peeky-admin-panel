import React from 'react'
import Seo from '../shared/layout-components/seo/seo'
import Link from 'next/link'

const Custom404 = () => {
    return (
        <div>
          {/* <!-- Page --> */}
      <Seo title="Error"/>

            <div className="page main-signin-wrapper bg-primary construction">
                <div className="d-flex header-setting-icon demo-icon fa-spin">
                    <a className="nav-link icon" href="#">
                        <i className="fe fe-settings settings-icon "></i>
                    </a>
                </div>
    
                <div className="container ">
                    <div className="construction1 text-center details text-white">
                        <div className="">
                            <div className="col-lg-12">
                                <h1 className="fs-140 mb-0">404</h1>
                            </div>
                            <div className="col-lg-12 ">
                                <h1>Axtardığınız səhifə mövcud deyil</h1>
                                <h6 className="fs-15 mt-3 mb-4 text-white-50">Daxil etdiyiniz səhifənin düzgünlüyündən əmin olun</h6>
                                <Link className="btn ripple btn-success text-center mb-2" href="/dashboard/">Geri qayıt</Link>
                            </div>
                        </div>
                    </div>
                </div>
    
            </div>
            {/* <!-- End Page --> */}
        </div>
      )
}

export default Custom404