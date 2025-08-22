import React from 'react'
import { Container, Row, Col, NavLink } from 'react-bootstrap'
import about1_image from '../assets/image/assets/about/about_img1.avif'
import image1 from '../assets/image/assets/about/community.jpg'
import image2 from '../assets/image/assets/about/storepic.jpg'
import image3 from '../assets/image/assets/about/presscenter.jpeg'
import image4 from '../assets/image/assets/about/joinus.jpeg'


const mockdata=[
  {
    id:1,
    title:"Dream Big.",
    pagaraph:'Our story is proof that even the biggest dreams come true. Were committed to providing opportunities for people to achieve their own dreams.'

},{
    id:2,
    title:"Work Hard.",
    pagaraph:'Were firm believers in doing things the right way. And the right way usually involves a lot of hard work. But if youre not doing things right, youre probably doing them wrong.'

},{
  id:3,
  title:"Play Fair.",
  pagaraph:'We value honesty, integrity, respect, courage, and fairness.'
},{
  id:4,
  title:"Have Fun.",
  pagaraph:'Weve always felt that if youre not having fun, you should do something else. Lifes too short to not be enjoyed.'
},{
  id:5,
  title:"Make a Difference.",
  pagaraph:'Can a restaurant make a difference? We think it can. Weve always felt a responsibility to improve the lives of our employees and communities.' 
},{
  id:6,
  title:"Get It Done.",
  pagaraph:'Weve found that success usually leads to more success. Its why we chase after positive results, and its why weve been, well, successful.'
}]

const mockdata2=[
  {
    id:11,
    title:"join us",
    pagaraphs:"Enjoy more opportunities to develop and grow within our organization Join the team today!",
    image:image1,
    text:"carrer",
  },
  {
    id:12,
    title:"Open an Franchies",
    pagaraphs:"Interested in becoming an Arby's franchisee? Let’s talk.",
    image:image2,
    text:'Franchising'
  },{
    id:13,
    title:"Our's Foundation.",
    pagaraphs:"We continue to support causes that improve the lives of America’s youth.",
    image:image3,
    text:'foundation'
  },{
    id:14,
    title:"Press Center",
    pagaraphs:"Find the latest company announcements, brand news, and authorized images.",
    image:image4,
    text:'press center'
  }]

const About = () => {
  return (
    <>
      <style>{`
        .about-section {
          position: relative;
          padding:10rem 0rem;
        }

        .box_mainarea {
          background-color: #ffffff;
          padding: 2rem;
          box-shadow: 0 0 1rem rgba(0, 0, 0, 1);
          border-radius: 10px;
          position: relative;
          z-index: 2;
        }
      `}</style>

      <section
        className="about-section"
      >
        <Container className='py-5 px-5 px-md-0'>
          <Row>
            <Col sm={12} md={6}>
              <div className="box_mainarea">
                <h2>INSPIRING SMILES THROUGH DELIGHTFUL EXPERIENCES™</h2>
                <p>
                  The Arby's brand purpose is Inspiring Smiles Through Delightful Experiences™. Arby's delivers on its purpose by celebrating the art of Meatcraft® with a variety of high-quality proteins and innovative, crave-able sides, such as Curly Fries and Jamocha shakes.
                  Arby's Fast Crafted® restaurant services feature a unique blend of quick-serve speed combined with the quality and made-for-you care of fast casual.
                  Arby's Restaurant Group, Inc. is the franchisor of the Arby's Brand and is part of the Inspire Brands family of restaurants headquartered in Atlanta, Ga.
                  Arby’s, founded in 1964, is a leading sandwich drive-thru restaurant brand with more than 3,600 restaurants globally.
                </p>
              </div>
            </Col>
             <Col sm={12} md={6} className="py-5 py-md-0">
           <img src={about1_image} className="w-100 h-100 object-fit-cover" alt="about" />
            </Col>
          </Row>

          {/* Section_2 */}
          <Row className='justify-content-center py-5 my-5'>
           {mockdata2.map((data2,idnx)=>{
            return(
              <Col key={idnx} sm={12} md={5} className=" m-4 p-4 box_mainarea d-flex gap-4">
                  <div >
                    <img src={data2.image} alt={data2.title} className='rounded' style={{width:'10rem',height:'10rem'}}/>
                  </div>
                  <div>
                    <h2>{data2.title}</h2>
                    <p>{data2.pagaraphs}</p>
                    <div className="d-flex justify-content-end">
                    <NavLink to="/" className=' order_now btn_red  rounded p-3 fw-bold '><Button>{data2.text}</Button></NavLink>
                    </div>
                  </div>
                
              </Col>
            )
           })}
          </Row>

            {/*Section_3  */}
          <Row className='py-5'>
            <h1 className='py-5'>What we belive in</h1>
            <div className='box_mainarea p-5'>
              <p className='fw-bold'>Since the day we opened, we've had six simple principles that help guide us in the goals we set, the relationships we build, and the decisions we make:</p>
            
                <Row>
                  {
                    mockdata.map((data,idx)=>{
                      return(
                        <Col className='p-3' key={idx} sm={12} md={6}>
                          
                            <h2><span className='text-danger'>{idx+1+". "}</span>{data.title}</h2>
                            <p>{data.pagaraph}</p>
                          
                        </Col>
                      )
                    })
                  }
                </Row>
          
            </div>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default About
