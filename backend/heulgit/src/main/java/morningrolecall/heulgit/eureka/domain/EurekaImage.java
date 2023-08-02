package morningrolecall.heulgit.eureka.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "eureka_image")
@JsonIgnoreProperties("eureka")
public class EurekaImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "eureka_image_id", nullable = false)
	private Long eurekaImageId;

	@Column(name = "file_uri", nullable = false)
	private String fileUri;

	@ManyToOne
	@JoinColumn(name = "eureka_id", nullable = false)
	private Eureka eureka;

	@Builder
	public EurekaImage(String fileUri, Eureka eureka) {
		this.fileUri = fileUri;
		this.eureka = eureka;
	}
}