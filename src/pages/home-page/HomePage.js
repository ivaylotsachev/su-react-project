function HomePage() {
    return (
        <div className='page-container flex flex-column w-100'>
            <section className='page-section home-head-section'>
                <h1 className='page-title'>Little Letter</h1>
                <p className='title-desctiption'>Your today`s best memories!</p>
            </section>

            <section className='page-section home-head-section'>
                <h4 className='title-normal'>All Stories</h4>
                <div className='stories-container'>list stories here</div>
            </section>
        </div>
    );
}

export default HomePage;
