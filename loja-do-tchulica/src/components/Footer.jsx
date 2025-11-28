import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Loja do Tchulica</h3>
            <p className='texto-branco'> Somos a Loja do Tchulica! A única na cidade com 6 meses de GARANTIA! Trabalhamos com as melhores peças do mercado e oferecemos o melhor atendimento ao cliente. Temos variedade em capas, películas e acessórios para todos os celulares. Fazemos manutenção em todos os tipos de aparelhos celulares e eletrônicos. </p>
            <p className='texto-branco'> VENHA PARA A LOJA DO TCHULICA!!</p>
          </div>

          <div className="footer-section">
            <h4>Contato</h4>
            <p className='texto-branco'><a href="mailto:lojadotchulica@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="email-button"><img src="https://cdn-icons-png.flaticon.com/128/2099/2099199.png" alt="Email" /></a>lojadotchulica@gmail.com</p>
            <p className='texto-branco'><a
              href="https://wa.me/5519996662877"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
            >
              <img src="https://cdn-icons-png.flaticon.com/128/4423/4423697.png" alt="WhatsApp" />
            </a>
              (19) 99666-2877</p>
            <p className='texto-branco'><a href="https://www.instagram.com/lojadotchulica/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-button"
            ><img src="https://cdn-icons-png.flaticon.com/128/174/174855.png" alt="Instagram" /></a>@lojadotchulica</p>
          </div>

          <div className="footer-section">
            <h4>Horário</h4>
            <p className='texto-branco'>Seg a Sex: 09h00 às 18h00</p>
            <p className='texto-branco'>Sábado: 09h00 às 14h00</p>
          </div>

          <div className="footer-section">
            <h4>Localização</h4>
            <div className='texto-branco'>Rua Treze de Maio, 291 - Centro, Amparo - SP</div>
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
          <p className='texto-branco'>&copy; 2025 Loja do Tchulica - Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

