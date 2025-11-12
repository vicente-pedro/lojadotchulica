import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Loja do Tchulica</h3>
            <p>Os melhores celulares e acessórios você encontra aqui.</p>
          </div>

          <div className="footer-section">
            <h4>Contato</h4>
            <p>lojadotchulica@gmail.com</p>
            <p>(19) 99666-2877</p>
          </div>

          <div className="footer-section">
            <h4>Horário</h4>
            <p>Seg a Sex: 09h00 às 18h00</p>
            <p>Sábado: 09h00 às 14h00</p>
          </div>

          <div className="footer-section">
            <h4>Localização</h4>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.2979017512083!2d-46.76691342483295!3d-22.70339187939392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8f72fd4e9a7db%3A0x7cd03c479cde72ab!2sR.%20Treze%20de%20Maio%2C%20291%20-%20Centro%2C%20Amparo%20-%20SP%2C%2013960-000!5e0!3m2!1spt-BR!2sbr!4v1730662800000!5m2!1spt-BR!2sbr&maptype=satellite"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Loja do Tchulica"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Loja do Tchulica - Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
